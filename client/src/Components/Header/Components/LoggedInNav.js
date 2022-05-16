import React from "react";
import { Link } from "react-router-dom";
import "../../../Assets/Styles/Header/navigation.css";

function LoggedInNav() {

    return (
        <div className="navigation-container">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </div>
    );
}

export default LoggedInNav;