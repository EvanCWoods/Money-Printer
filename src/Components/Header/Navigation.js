import React from "react";
import { Link } from "react-router-dom";
import "../../Assets/Styles/Header/navigation.css";

function Navigation() {
    return (
        <div className="navigation-container">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/">placeholder</Link>
            <Link className="nav-link" to="/">placeholder</Link>
        </div>
    );
}

export default Navigation;