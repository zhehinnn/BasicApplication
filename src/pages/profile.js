import React from "react";
import { Link } from 'react-router-dom';

const Profile = () => {
    const [aboutMe, setAboutMe] = React.useState('This is your about me section.');
  
    return (
      <div className="profile-container">
        <h2>User Profile</h2>
        <p><strong>About Me:</strong> {aboutMe}</p>
        <Link to="/edit-about-me">
          <button>Edit About Me</button>
        </Link>
      </div>
    );
  };
  
 
export default Profile;