import React from "react";
import { Link } from "react-router-dom";
import "../../../Assets/Styles/Header/navigation.css";

function Navigation() {
    return (
        <div className="navigation-container">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/sign-up">Sign Up</Link>
        </div>
    );
}

export default Navigation;