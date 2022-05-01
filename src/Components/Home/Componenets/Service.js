import React from "react";
import { Link } from "react-router-dom";

function Service(props) {
  return (
      <div className="service-box-container">
        <div className={props.classes}>
          <h2 className="service-box-title">{props.title}</h2>
          <p className="service-box-description">{props.description}</p>
        </div>
        <Link to={props.redirect}><button className="service-box-button">More</button></Link>
      </div>
  );
}

export default Service;
