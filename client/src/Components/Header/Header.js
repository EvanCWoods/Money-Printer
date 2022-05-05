import React from "react";
import Logo from "./Components/Logo.js";
import Navigation from "./Components/Navigation.js";
import "../../Assets/Styles/Header/header.css";

function Header() {
    return (
        <div className="header-container">
            <Logo />
            <div className="filler"></div>
            <Navigation />
        </div>
    );
}

export default Header;