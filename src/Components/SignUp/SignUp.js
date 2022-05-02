import React from "react";
import Header from "../Reusable/Header.js"
import "../../Assets/Styles/signUp/signUp.css";

function SignUp() {
    return (
        <div className="sign-up-container">
            <Header top="Sign up to" bottom="the future" />
            <div className="sign-up-form-container">
                <form className="sign-up-form">
                    <div className="names-container">
                        <input type="text" className="sign-up-input input" placeholder="First Name"></input>
                        <input type="text" className="sign-up-input input" placeholder="Last Name"></input>
                    </div>
                    <div className="email-container">
                        <input type="text" className="sign-up-email input" placeholder="Email"></input>
                    </div>
                    <div className="password-container">
                        <input type="text" className="sign-up-password input" placeholder="Password"></input>
                        <input type="text" className="sign-up-password input" placeholder="Confirm Password"></input>
                    </div>
                    <div className="sign-up-button-container">
                        <button className="sign-up-button">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;