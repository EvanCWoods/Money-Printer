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
                    <p className="current-position-duration">Duration: {props.duration}</p>
                    <div className="current-position-percentage-container">
                        <div className={`percentage-circle ${props.color}`}>
                            <h3 className="current-position-percentage">{props.currentPercentage}</h3>
                        </div>
                    </div>
                </div>
                <div className="action-container">
                    <h3 className="action-title">Best Action: </h3>
                    <h3 className={`${props.Recomendation} action`}>{ props.Recomendation}</h3>
                </div>
            </div>
        </div>
    )
}

export default Card;