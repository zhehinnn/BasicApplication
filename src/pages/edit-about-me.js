import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditAboutMe = () => {
  const [aboutMe, setAboutMe] = useState('');
  const navigate = useNavigate();

  const handleSaveDraft = () => {
    // Logic to save as draft
    console.log('Saved as draft:', aboutMe);
    navigate('/profile');
  };

  const handleSaveChanges = () => {
    // Logic to save changes
    console.log('Changes saved:', aboutMe);
    navigate('/profile');
  };

  return (
    <div className="edit-about-me-container">
      <h2>Edit About Me</h2>
      <textarea
        value={aboutMe}
        onChange={(e) => setAboutMe(e.target.value)}
        placeholder="Write something about yourself..."
      />
      <div>
        <button onClick={handleSaveDraft}>Save as Draft</button>
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditAboutMe;