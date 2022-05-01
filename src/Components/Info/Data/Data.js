import React from "react";
import Landing from "./Landing/Landing.js";
import Information from "../Reusable/Information.js";
import Facts from "../Reusable/Facts.js";

function Data() {
    return( 
        <div className="data-info-container">
            <Landing />
            <Information title="Built for your ideas" description="lorem"/>
            <Facts title="Allowing businesses to leverage the power of data" description="The world revolves around data, and our data is really... really good. Get live price feeds for markets, technical indicators information for historical periods and much more with the live market data package." list={[1,2,3,4,5]}/>
        </div>
    );
}

export default Data;