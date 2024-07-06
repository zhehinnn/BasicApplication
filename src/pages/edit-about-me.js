import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditAboutMe = () => {
  const [aboutMe, setAboutMe] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', { withCredentials: true });
        console.log(response)
        setAboutMe(response.data.about_me_draft); 
      } catch (err) {
        console.error('Error fetching profile:', err.response ? err.response.data : err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (draft = false) => {
    console.log(draft)
    try {
      await axios.put('http://localhost:5000/profile', { about_me: aboutMe, draft }, { withCredentials: true });
      draft ? setMessage('Draft saved successfully') : setMessage('Profile updated successfully');
      if (!draft) {
        navigate('/profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="edit-about-me-container">
      <h2>Edit About Me</h2>
      <textarea
        value={aboutMe}
        onChange={(e) => setAboutMe(e.target.value)}
        placeholder="Write something about yourself"
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={() => handleSave(true)}>Save as Draft</button>
      <button onClick={() => handleSave(false)}>Save Changes</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditAboutMe;