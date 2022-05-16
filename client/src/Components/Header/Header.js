import React from "react";
import Logo from "./Components/Logo.js";
import Navigation from "./Components/Navigation.js";
import LoggedInNav  from "./Components/LoggedInNav.js";
import "../../Assets/Styles/Header/header.css";


const loggedIn = localStorage.getItem("super-secret");
console.log(loggedIn);

function Header() {
    return (
        <div className="header-container">
            <Logo />
            <div className="filler"></div>
            {loggedIn ? 
                <LoggedInNav />
            : <Navigation /> 
      }
        </div>
    );
}

export default Header;