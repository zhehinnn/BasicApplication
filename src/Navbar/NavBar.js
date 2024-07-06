import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements.js";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/Profile" activeStyle>
                        Profile
                    </NavLink>
                    <NavLink to="/Login" activeStyle>
                        Login
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;