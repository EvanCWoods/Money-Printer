import React, { useEffect, useState } from "react";
import Card from "./Card/Card.js";
import "../../Assets/Styles/Dashboard/dashboard.css";

function Dashboard() {

    let recomendation = "";
    const [data, setData] = useState([]);

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
            {data ? data?.map((asset) => (
                <Card color={asset.Signal} ticker={asset.Ticker} price={`$${asset.LastClose}`} marketSide={asset.Signal} currentPercentage={`${asset.Performance}%`} duration={`${asset.Duration} Days`} Recomendation={recomendation}/>
            )) : null}
            <Card color="Buy" ticker="AAPL" price="$199.23" marketSide="Buy" currentPercentage="12%" duration="41 Days" Recomendation="Hold"/>
            <Card color="Sell" ticker="TSLA" price="$724.37" marketSide="Sell" currentPercentage="-1.3%" duration="1 Days" Recomendation="Hold"/>
        </div>
    );
}

export default Dashboard;