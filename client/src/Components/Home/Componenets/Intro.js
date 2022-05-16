import React from "react";
import "../../../Assets/Styles/Home/intro.css";
import automateImage from "../../../Assets/Images/FragrantDirectBug-max-1mb.gif";

function Intro() {
  return (
    <div className="intro-container">
        <div className="intro-left">
          <img src={automateImage} alt="automate"></img>
        </div>
      <div className="intro-right">
        <div className="intro-title-container">
          <h1 className="intro-title">Why use Cognizance</h1>
        </div>
        <div className="intro-description-container">
          <p className="intro-description">
            The finance sector is becoming increasingly complex with every
            passing day. Although more people are investing than ever in
            histroy, more people are losing money. Not the ultra wealthy, but
            working people who are trying to create a better future for
            themselves and their families. Cognizance's aim is to empower
            everyone to start using their hard earned money, to create more
            wealth with confidence. The keys to this software are:
          </p>
          <ul className="intro-list">
              <li className="intro-list-item"><span className="custom-list-point"><i class="fa-solid fa-diamond"></i>  </span>Comprehensive market data.</li>
              <li className="intro-list-item"><span className="custom-list-point"><i class="fa-solid fa-diamond"></i>  </span>Algorithms that outperform the market.</li>
              <li className="intro-list-item"><span className="custom-list-point"><i class="fa-solid fa-diamond"></i>  </span>Confidence in the product.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Intro;