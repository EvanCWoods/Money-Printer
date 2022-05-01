import React from "react";
import "../../../Assets/Styles/Info/Data/facts.css";


function Facts(props) {
    return (
        <div className="facts-container">
            <div className="facts-left">
                <div className="facts-content">
                    <h1 className="facts-title">{props.title}</h1>
                    <p className="facts-description">{props.description}</p>
                    <ul className="facts-list-container">
                        {
                            props.list.map((value, index) => {
                                return <li className="fact-list-item">{value}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Facts;