import './App.css';
import NavBar from "./Navbar/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Profile from "./pages/profile.js";
import Login from "./pages/login.js"
import styled from 'styled-components';
import EditAboutMe from "./pages/edit-about-me.js"
import Register from './pages/register.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainContainer = styled.div`
  background-color: #393939; 
  min-height: 100vh; 
  padding: 20px;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', { withCredentials: true });
        if (response.status === 200) {
          console.log(isLoggedIn)
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log(isLoggedIn)
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <><Router>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <MainContainer>
      <Routes>
        <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/edit-about-me" element={<EditAboutMe/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      </MainContainer>
    </Router></>
  );
}

export default App;
