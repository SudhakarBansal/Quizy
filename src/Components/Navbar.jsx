import React from "react";
import logo from './images/logo.png'
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark pt-5 d-flex justify-content-center">
                <img src={logo} width="130" alt="Quizy" id="logo" />
            </nav>
        </>
    );
};

export default Navbar;