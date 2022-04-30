import React from "react";
import "../../Assets/Styles/Home/home.css";
import Landing from "./Componenets/Landing.js";
import Services from "./Componenets/Services.js";

function Home() {
    return (
        <div className="home-container">
            <Landing />
            <Services />
        </div>
    );
}

export default Home;