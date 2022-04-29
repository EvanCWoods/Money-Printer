import React from "react";
import { Link } from "react-router-dom";
import "../../Assets/Styles/Header/navigation.css";

function Navigation() {
    return (
        <div className="navigation-container">
            <Link to="/">Home</Link>
            <Link to="/">placeholder</Link>
            <Link to="/">placeholder</Link>
        </div>
    );
}

export default Navigation;