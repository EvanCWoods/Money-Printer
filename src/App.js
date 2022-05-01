import React from "react";
import Header from "./Components/Header/Header.js";
import Home from "./Components/Home/Home.js"
import Data from "./Components/Info/Data/Data.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Assets/Styles/root.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={ <Home /> }/>
        <Route exact path="/live-data-information" element={ <Data /> }/>
      </Routes>
    </Router>
  );
}

export default App;
