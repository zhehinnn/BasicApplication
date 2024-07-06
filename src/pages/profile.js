import React, {useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const navigate = useNavigate();
    const [fetchingError, setFetchingError] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            navigate('/login');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/profile', { withCredentials: true });
                setUsername(response.data.username);
                setAboutMe(response.data.about_me);
              } catch (err) {
                setFetchingError(true);
                console.error('Error fetching profile:', err.response ? err.response.data : err.message);
              }
        };
    
        fetchProfile();
      }, []);

    return (
    <div className="profile-container">
        <h2>User Profile</h2>
        <p>Username: {username}</p>
        <p><strong>About Me:</strong> {aboutMe}</p>
        <Link to="/edit-about-me">
        <button>Edit About Me</button>
        </Link>
        {fetchingError ? (
            <Link to="/login">
                <button>Login</button>
            </Link>
        ) : (
        <button onClick={handleLogout}>
            Logout
        </button>
        )}
    </div>
    );
};
  
 
export default Profile;


  
