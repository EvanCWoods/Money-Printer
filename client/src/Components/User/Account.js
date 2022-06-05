import React, { useState, useEffect } from "react";
import "../../Assets/Styles/User/account.css";

function Account() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  return (
    <div className="account-container">
      <div className="account-details-container">
        <p>
          Hi,{" "}
          {userData?.firstName.charAt(0).toUpperCase() +
            userData?.firstName.slice(1)}{" "}
          {userData?.lastName.charAt(0).toUpperCase() +
            userData?.lastName.slice(1)}
        </p>
        <div className="api-container">
          <p>
            Here is your API key. Ensure that you keep this safe and treat it as
            if It's a password.
          </p>
          <br></br>
          <p>API Key: {userData?.apiKey}</p>
          <div className="api-tutorial-container">
              <p>Use your API key in the header of your requests as seen below:</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
