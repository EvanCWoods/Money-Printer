import React, { useState, useEffect } from "react";
import "../../Assets/Styles/User/account.css";
import Header from "../Reusable/Header.js";

function Account() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  return (
    <div className="account-container">
      <div className="account-details-container">
        <Header top={`Hi, ${userData?.firstName}`} />
        <div className="api-container">
          <p className="api-title">
            Here is your API key. <br></br> Ensure that you keep this safe and treat it as
            if It's a password.
          </p>
          <br></br>
          <div className="api-key-container"><p><span className="bold-text">API Key: </span> {userData?.apiKey}</p></div>
          <br></br>
          <div className="api-tutorial-container">
              <p>This API is built to be easy to use. Simply use your API key in the header of your request and you're using Cognizance's data.</p>
              <br></br>
              <div className="tutorial-container">
                <p className="sample-request">{"fetch('https://evan-woods-final-project.herokuapp.com/api/current/btc', {"}</p>
                <p className="sample-request-method">{"method: 'GET'"}</p>
                <p className="sample-request-mode">{"mode: 'cors'"}</p>
                <p className="sample-request-headers">{"headers: {"}</p>
                <p className="sample-request-headers">{"'content-type': 'application/json'"}</p>
                <p className="sample-request-headers">{"apikey: YOUR_API_KEY"}</p>
                <p className="sample-request-headers">{" }"}</p>
                <p className="sample-request">{" });"}</p>
              </div>
          </div>
          <div className="endpoints-list">
                <div className="endpoint-container">
                  <p className="endpoint-title">GET all BTC data</p>
                  <p className="endpoint">https://evan-woods-final-project.herokuapp.com/api/all/btc</p>
                </div>
                <div className="endpoint-container">
                  <p className="endpoint-title">GET current BTC data</p>
                  <p className="endpoint">https://evan-woods-final-project.herokuapp.com/api/current/btc</p>
                </div>
                <div className="endpoint-container">
                  <p className="endpoint-title">GET all ETH data</p>
                  <p className="endpoint">https://evan-woods-final-project.herokuapp.com/api/all/eth</p>
                </div>
                <div className="endpoint-container">
                  <p className="endpoint-title">GET current ETH data</p>
                  <p className="endpoint">https://evan-woods-final-project.herokuapp.com/api/current/eth</p>
                </div>
                <div className="endpoint-container">
                  <p className="endpoint-title">GET all BNB data</p>
                  <p className="endpoint">https://evan-woods-final-project.herokuapp.com/api/all/bnb</p>
                </div>
                <div className="endpoint-container">
                  <p className="endpoint-title">GET current BNB data</p>
                  <p className="endpoint">https://evan-woods-final-project.herokuapp.com/api/current/bnb</p>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
