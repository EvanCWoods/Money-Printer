import React from "react";
import Landing from "./Landing/Landing.js";
import Information from "../../Reusable/Information.js";
import Facts from "../../Reusable/Facts.js";
import "../../../Assets/Styles/Info/Data/container.css";

function Algorithm() {
    return(
        <div className="data-info-container">
            <Landing />
            <Information title="Expert strategy at your fingertips" description="Trading algorithms are all the hype, AI bots, a defined set of rules to trade by, the next warren buffet selling you thier online course. it all gets so confusing. Our trading algorithms were developed by industry professionals and have been tested on a vast set of historical data to ensure it's effectiveness. These algorithms outperform the market by 2:1... Yes, using our services can allow you to make twice as much money as investing on your own. Dont believe it? see fo yourself here:"/>
            <Facts title="Make the market eat your dust" description="Our algorithms are tried and tested, automating the process of finding good times to buy, and more importantly, when to sell. Get market signals that make the hedge funds jealous by signing up to our algorithms subscription." list={["Algorithms have been tested on historical data", "Algorithms consistently outpace the market by a 2:1 ratio", "Get on both sides of the action with buy and sell signals", "See the tests and develop a trust in the product", "Deduce the stress of the stock market and let us do the heavy lifting"]}/>
        </div>
    )
}

export default Algorithm;