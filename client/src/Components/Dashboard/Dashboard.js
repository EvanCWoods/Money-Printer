import React from "react";
import Card from "./Card/Card.js";
import "../../Assets/Styles/Dashboard/dashboard.css";

function Dashboard() {

    fetch("/api/data/", {method: "Get"}).then( (response) => {
        return response.json();
    }).then( (data) => {
        console.log(data);
    });

    return(
        <div className="dashboard-container">
            <Card color="Buy" ticker="BTC" price="$99" marketSide="buy" currentPercentage="42%"/>
            <p>{}</p>
        </div>
    );
}

export default Dashboard;