import React from "react";
import "../../Assets/Styles/Home/home.css";
import Landing from "./Componenets/Landing.js";
import Services from "./Componenets/Services.js";
import Intro from "./Componenets/Intro.js";

function Home() {
    return (
        <div className="home-container">
            <Landing />
            <Intro />
            <Services />
        </div>
    );
}

export default Home;