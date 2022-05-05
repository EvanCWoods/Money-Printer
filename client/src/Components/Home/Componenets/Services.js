import React from "react";
import Service from "./Service.js";
import "../../../Assets/Styles/Home/services.css";

function Services() {
    return (
        <div className="services-container">
            <div className="services-title-container">
                <h1 className="services-title">Financial Services For Any of Your Needs</h1>
            </div>
            <div className="services-boxes-container">
                <Service title="Live Market Data" description="Rapid, accurate and perfomant live data feeds" classes="service-box purple" redirect="/live-data-information"/>
                <Service title="Market Signals Algorithms" description="Smart trading algorithms that ensure you outpace the market." classes=" service-box red" redirect="/"/>
            </div>
        </div>
    );
}

export default Services;