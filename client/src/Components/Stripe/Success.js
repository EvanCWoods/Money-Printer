import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Reusable/Header";
import investmentGif from "../../Assets/Images/investment.png";
import getUserData from "../../utils/userData";
import "../../Assets/Styles/Succuss/success.css";

function Success() {
  const [customer, setCustomer] = useState();

  let parameters = window.location.toString().split("/");
  parameters = parameters[parameters.length - 1].split("=");
  parameters = parameters[parameters.length - 1];
  console.log(parameters);

  // useEffect(() => {
  const url = `/success?session_id=${parameters}`;

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const json = await response.json();
      const data = await json;
      console.log(data);
      setCustomer(data);
      getUserData(data.email);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="succuss-container">
      <Header
        top="Welcome"
        bottom={customer?.name.split(" ")[0]}
        className="succuss-header"
      />
      <div className="success-content-container"><div className="success-left">
        <div className="success-header-container">
          <p className="thank-you">Thank you for your purchase!</p>
        </div>
        <div className="succuss-directions">
          <p className="success-text">
            View the Dashboard to see the what makes Cognizance different.
          </p>
          <div className="succuss-buttons-container">
            <Link to="/dashboard">
              <button className="success-button dashboard-button">
                Dashboard
              </button>
            </Link>
            <Link to="/">
              <button className="success-button home-button">Home</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="success-right">
        <img src={investmentGif} alt="investment" className="success-image"></img>
      </div></div>
    </div>
  );
}

export default Success;
