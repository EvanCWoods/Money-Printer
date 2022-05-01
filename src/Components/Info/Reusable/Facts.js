import React from "react";
import "../../../Assets/Styles/Info/Data/facts.css";


function Facts(props) {
    // function renderList() {
    //     const listContainer = document.querySelector(".facts-list-container");
    //     const list = props.list;
    //     console.log(list.length);
    //     for (const item in list) {
    //         const listItem = document.createElement("li");
    //         listItem.className = "fact-list-item";
    //         listItem.textContent = item;
    //         listContainer.appendChild(listItem);
    //     }
    // }
    return (
        <div className="facts-container">
            <div className="facts-left">
                <div className="facts-content">
                    <h1 className="facts-title">{props.title}</h1>
                    <p className="facts-description">{props.description}</p>
                    <ul className="facts-list-container"></ul>
                </div>
            </div>
        </div>
    )
}

export default Facts;