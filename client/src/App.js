import React from "react";
import Header from "./Components/Header/Header.js";
import Home from "./Components/Home/Home.js"
import Data from "./Components/Info/Data/Data.js";
import Algorithms from "./Components/Info/Algorithm/Algorithm.js";
import SignUp from "./Components/SignUp/SignUp.js";
import Login from "./Components/Login/Login.js";
import Dashboard from "./Components/Dashboard/Dashboard.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Assets/Styles/root.css";

function App() {

  return (
    <Router>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans&family=Ubuntu:wght@700&display=swap" rel="stylesheet"></link>
      <Header />
      <Routes>
        <Route exact path="/" element={ <Home /> }/>
        <Route exact path="/live-data-information" element={ <Data /> }/>
        <Route exact path="/algorithms-information" element={ <Algorithms />} />
        <Route exact path="/sign-up" element={ <SignUp /> }/>
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/dashboard" element={<Dashboard /> } />
      </Routes>
    </Router>
  );
}

export default App;
