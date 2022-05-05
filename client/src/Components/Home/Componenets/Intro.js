import React from "react";
import "../../../Assets/Styles/Home/intro.css";

function Intro() {
  return (
    <div className="intro-container">
        <div className="intro-left">
        </div>
      <div className="intro-right">
        <div className="intro-title-container">
          <h1 className="intro-title">Why use BUSINESS_NAME</h1>
        </div>
        <div className="intro-description-container">
          <p className="intro-description">
            The finance sector is becoming increasingly complex with every
            passing day. Although more people are investing than ever in
            histroy, more people are losing money. Not the ultra wealthy, but
            working people who are trying to create a better future for
            themselves and their families. BUSINESS_NAME's aim is to empower
            everyone to start using their hard earned money, to create more
            wealth with confidence. The keys to this software are:
          </p>
          <ul className="intro-list">
              <li className="intro-list-item">Comprehensive market data.</li>
              <li className="intro-list-item">Algorithms that outperform the market.</li>
              <li className="intro-list-item">Confidence in the product.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Intro;