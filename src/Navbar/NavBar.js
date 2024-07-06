import React from "react";
import { Nav, NavLink, NavMenu, NavBtn, NavLinkLogout } from "./NavBarElements.js";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            navigate('/login');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/Profile" activeStyle>
                        Profile
                    </NavLink>
                    
                </NavMenu>
                <NavBtn>
                    {isLoggedIn ? (
                        <NavLinkLogout onClick={handleLogout}>
                            Logout
                        </NavLinkLogout>
                    ) : (
                        <NavLink to="/login">Login</NavLink>
                    )}
                </NavBtn>
            </Nav>
            
        </>
    );
};
 
export default Navbar;