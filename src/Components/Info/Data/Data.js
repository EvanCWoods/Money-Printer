import React from "react";
import Landing from "./Landing/Landing.js";
import Information from "../Reusable/Information.js";
import Facts from "../Reusable/Facts.js";

function Data() {
    return( 
        <div className="data-info-container">
            <Landing />
            <Information title="Built for your ideas" description="lorem"/>
            <Facts title="Allowing businesses to leverage the power of data" description="The world revolves around data, and our data is really... really good. Get live price feeds for markets, technical indicators information for historical periods and much more with the live market data package." list={["Comprehensive market data across multiple markets including cryptocurrencies and traditional markets.", "Technical indicator data such as moving averages", "Support for integration into external application via our API", "Enables a user to leverage live data feeds to build their applications around", "Empowers users to maximize efficiency by building strategies around historical and live data"]}/>
        </div>
    );
}

export default Data;