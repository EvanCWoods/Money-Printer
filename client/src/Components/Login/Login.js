import React from "react";
import "../../Assets/Styles/Login/login.css";
import Header from "../Reusable/Header.js";
import getUserData from "../../utils/userData.js";

function Login() {
    async function sendForm(event) {
        event.preventDefault();
        const email = document.querySelector(".login-email").value;
        const password = document.querySelector(".login-password").value;

        const user = {
            email: email,
            password: password
        }

        console.log("SENDING RESPONSE");
        
        const response = await fetch("/api/users/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        })
        const json = await response;
        console.log("AWAITING RESPONSE");
        if(json) {
            console.log(json);
            localStorage.setItem("super-secret", json.Token);
            await getUserData(json.email);
            document.location.replace("/dashboard");
        }
    }
    return (
        <div className="login-container">
            <Header top="Sign in" bottom="" />
            <div className="login-form-container">
                <form className="login-form" onSubmit={sendForm}>
                    <div className="email-container">
                        <input type="email" className="login-email input login-email" placeholder="Email"></input>
                    </div>
                    <div className="password-container">
                        <input type="password" className="login-password input login-password" placeholder="Password"></input>
                    </div>
                    <div className="login-button-container">
                        <button className="login-button" type="submit">Log In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;