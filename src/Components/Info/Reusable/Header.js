import React from "react";

function Header(props) {
    return (
        <div className="landing-container">
            <div className="landing-content">
                <div className="landing-left">
                    <h1 className="landing-title green-text">{props.top}</h1>
                    <h1 className="landing-title">{props.bottom}</h1>
                </div>
            </div>
            <div className="angle-bottom"><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br></div>
        </div>
    )    
}

export default Header;