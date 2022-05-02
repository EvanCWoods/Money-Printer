import React from "react";
import "../../../Assets/Styles/Info/Data/facts.css";


function Facts(props) {
    return (
        <div className="facts-container">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <div className="facts-left">
                <div className="facts-content">
                    <h1 className="facts-title">{props.title}</h1>
                    <p className="facts-description">{props.description}</p>
                    <ul className="facts-list-container">
                        {
                            props.list.map((value, index) => {
                                return <li className="fact-list-item"><i class="fa-solid fa-diamond"></i><span>{value}</span></li>
                            })
                        }
                    </ul>
                    <div className="facts-skew"></div>
                </div>
            </div>
        </div>
    )
}

export default Facts;