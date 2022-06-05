import React from "react";
import { Link } from "react-router-dom";
import "../../../Assets/Styles/Header/navigation.css";
import { FaUserCircle } from "react-icons/fa";
function LoggedInNav() {
    const logout = () => {
        localStorage.removeItem("super-secret");
        localStorage.removeItem("userDetails");
        document.location.reload();
    }
    return (
        <div className="navigation-container">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/" onClick={logout}>logout</Link>
            <Link to="/account" className="nav-link"><FaUserCircle className="account-link"/></Link>
        </div>
    );
}

export default LoggedInNav;