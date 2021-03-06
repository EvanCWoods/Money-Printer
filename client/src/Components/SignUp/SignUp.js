import React from "react";
import Header from "../Reusable/Header.js";
import "../../Assets/Styles/signUp/signUp.css";

function SignUp() {
  async function sendForm(event) {
    event.preventDefault();
    const firstName = document.querySelector(".firstName").value;
    const lastName = document.querySelector(".lastName").value;
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;
    const confirmPassword = document.querySelector(".confirmPassword").value;
    let userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    if (password === confirmPassword) {
      const response = await fetch("/api/users/create", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      const json = await response.json();
      const data = await json;
            console.log(data);
            const checkout = await fetch("/checkout", {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
            })
            const checkoutJson = await checkout.json();
            const redirect = await checkoutJson;
            document.location.replace(redirect.url);
            localStorage.setItem("super-secret", data.Token);
          };
        }

  return (
    <div className="sign-up-container">
      <Header top="Unlock" bottom="the future" />
      <div className="sign-up-form-container">
        <form className="sign-up-form" onSubmit={sendForm}>
          <div className="names-container">
            <input
              type="text"
              className="sign-up-input input firstName"
              placeholder="First Name"
            ></input>
            <input
              type="text"
              className="sign-up-input input lastName"
              placeholder="Last Name"
            ></input>
          </div>
          <div className="email-container">
            <input
              type="email"
              className="sign-up-email input email"
              placeholder="Email"
            ></input>
          </div>
          <div className="password-container">
            <input
              type="password"
              className="sign-up-password input password"
              placeholder="Password"
            ></input>
            <input
              type="password"
              className="sign-up-password input confirmPassword"
              placeholder="Confirm Password"
            ></input>
          </div>
          <div className="sign-up-button-container">
            <button className="sign-up-button" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
