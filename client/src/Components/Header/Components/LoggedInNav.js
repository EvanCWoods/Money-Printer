import React from "react";
import { Link } from "react-router-dom";
import "../../../Assets/Styles/Header/navigation.css";

function LoggedInNav() {
    // const logout = () => {
    //     localStorage.removeItem("super-secret");
    //     document.location.reload();
    // }
    return (
        <div className="navigation-container">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            {/* <Link className="nav-link" to="/" onClick={logout}>logout</Link> */}
        </div>
    );
}

export default LoggedInNav;