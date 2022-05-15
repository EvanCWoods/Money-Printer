import React, { useEffect, useState } from "react";
import Card from "./Card/Card.js";
import "../../Assets/Styles/Dashboard/dashboard.css";

function Dashboard() {

    let recomendation = "";
    const [data, setData] = useState({});

    useEffect(() => {
        const url = "/api/data/";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setData(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    if (data.Performance > 20 && data.Duration < 7 && data.Signal === "Buy") {
        recomendation = "Sell";
    } else if (data.Performance > 20 && data.Duration < 7 && data.Signal === "Sell"){
        recomendation = "Buy";
    }
    else {
        recomendation = "Hold";
    }
    return(
        <div className="dashboard-container">
            <Card color={data.Signal} ticker={data.Ticker} price={`$${data.LastClose}`} marketSide={data.Signal} currentPercentage={`${data.Performance}%`} duration={`${data.Duration} Days`} Recomendation={recomendation}/>
        </div>
    );
}

export default Dashboard;