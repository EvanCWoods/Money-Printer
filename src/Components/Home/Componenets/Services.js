import React from "react";
import "../../../Assets/Styles/Home/services.css";

function Services() {
    return (
        <div className="services-container">
            <div className="services-title-container">
                <h1 className="services-title">Financial Services For Any of Your Needs</h1>
            </div>
            <div className="services-boxes-container">
                <div className="service-box purple">
                    <h2 className="service-box-title">Live market data</h2>
                    <p className="service-box-description">Fast paced, accurate and multipurpose market data</p>
                    <button className="service-box-button">More</button>
                </div>
            </div>
        </div>
    );
}

export default Services;