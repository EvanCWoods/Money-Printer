import React from "react";
import "../../../Assets/Styles/Dashboard/Card/card.css";

function Card(props) {
    return(
        <div className="card-container">
            <div className="card-header">
                <h4 className={`card-market-side ${props.color}`}>{props.marketSide}</h4>
                <h1 className={`card-title ${props.color}`}>{props.ticker}</h1>
                <h4 className={`card-price ${props.color}`}>Last Close: {props.price}</h4>
            </div>
            <div className="card-body">
                <div className="current-position-container">
                    <p className="current-position-title">Current Position</p>
                    <div className="current-position-percentage-container">
                        <div className={`percentage-circle ${props.color}`}>
                            <h3 className="current-position-percentage">{props.currentPercentage}</h3>
                        </div>
                    </div>
                </div>
                <div className="last-day-container">
                    <p className="last-day-title">Last 24 hours:</p>
                    <div className="last-day-graph-container">
                        ADD A GRAPH USING A LIBRARY
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;