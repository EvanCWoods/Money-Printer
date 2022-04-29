import React from "react";
import Header from "./Components/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Assets/Styles/root.css";

function App() {
  return (
    <Router>
      <Header />
    </Router>
  );
}

export default App;
