import logo from './logo.svg';
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

const MainContainer = styled.div`
  background-color: #393939; 
  min-height: 100vh; 
  padding: 20px;
`;

function App() {
  return (
    <><Router>
      <NavBar />
      <MainContainer>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-about-me" element={<EditAboutMe/>} />
      </Routes>
      </MainContainer>
    </Router></>
  );
}

export default App;
