import React from "react";

function Service(props) {
  return (
      <div className="service-box-container">
        <div className={props.classes}>
          <h2 className="service-box-title">{props.title}</h2>
          <p className="service-box-description">{props.description}</p>
        </div>
        <button className="service-box-button">More</button>
      </div>
  );
}

export default Service;
