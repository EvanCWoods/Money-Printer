import React from "react";
import Card from "./Card/Card.js";
import "../../Assets/Styles/Dashboard/dashboard.css";

function Dashboard() {
    return(
        <div className="dashboard-container">
            <Card color="buy" ticker="BTC" price="$99" marketSide="buy" currentPercentage="42%"/>
        </div>
    );
}

export default Dashboard;