require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true,
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Register user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Username already exists' });
        }
        return res.status(500).json({ error: 'Server error' });
      }
      res.status(201).send('User registered');
    }
  );
});

// Login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(400).send('Invalid credentials');

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).send('Invalid credentials');

    req.session.user = { id: user.id, username: user.username };
    res.send('Login successful');
  });
});

// Logout user
app.post('/logout', (req, res) => {
    req.session.destroy(err => {    
        if (err) return res.status(500).json({ error: 'Logout error' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
});

// Middleware to protect routes
const auth = (req, res, next) => {
    if (req.session.user) {
        next();
      } else {
        res.status(401).send('Unauthorized');
      }
};

// Example protected route
app.get('/protected', auth, (req, res) => {
    app.get('/protected', auth, (req, res) => {
        res.send(`Hello, ${req.session.user.username}`);
      });
});

// Save draft
app.post('/save-draft', auth, (req, res) => {
  const { aboutMe } = req.body;
  const userId = req.user.id;

  db.query(
    'UPDATE users SET about_me_draft = ? WHERE id = ?',
    [aboutMe, userId],
    (err, result) => {
      if (err) return res.status(500).send('Server error');
      res.send('Draft saved');
    }
  );
});

//Get About Me
app.get('/profile', (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    const userId = req.session.user.id;
  
    db.query('SELECT username, about_me, about_me_draft FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) return res.status(500).json({ error: 'Server error' });
      if (results.length === 0) return res.status(404).json({ error: 'User not found' });
  
      const user = results[0];
      res.json({
        username: user.username,
        about_me: user.about_me,
        about_me_draft: user.about_me_draft
      });
    });
  });

// Save "About Me"
app.put('/profile', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = req.session.user.id;
  const { about_me, draft } = req.body; 

  const column = draft ? 'about_me_draft' : 'about_me';

  db.query(`UPDATE users SET ${column} = ? WHERE id = ?`, [about_me, userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.json({ message: 'Profile updated successfully' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});