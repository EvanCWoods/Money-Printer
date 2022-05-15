import React from "react";
import "../../../../Assets/Styles/Info/Data/container.css";
import rocketImage from "../../../../Assets/Images/rocket.gif"

function Information(props) {
    return (
        <div className="intro-container">
        <div className="intro-left">
          <img src={rocketImage} alt="rocket"></img>
        </div>
      <div className="intro-right">
        <div className="intro-title-container">
          <h1 className="intro-title">{props.title}</h1>
        </div>
        <div className="intro-description-container">
          <p className="intro-description">{props.description}</p>
        </div>
      </div>
    </div>
    );
}

export default Information;