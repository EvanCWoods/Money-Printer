import React from "react";
import Header from "./Components/Header/Header.js";
import Home from "./Components/Home/Home.js"
import Data from "./Components/Info/Data/Data.js";
import Algorithms from "./Components/Info/Algorithm/Algorithm.js";
import SignUp from "./Components/SignUp/SignUp.js";
import Login from "./Components/Login/Login.js";
import Dashboard from "./Components/Dashboard/Dashboard.js"
import Footer from "./Components/Footer/Footer.js";
import Success from "./Components/Stripe/Success.js"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./Assets/Styles/root.css";


const ProtectedRoute = ({children }) => {
  const token = localStorage.getItem("super-secret");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Set a timer for clearing the JWT local storage
setInterval(removeItem,1000 * 60 * 60);
function removeItem(){
	  window.localStorage.removeItem("super-secret");
}

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
        <Route
          exact path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/success" element={ <Success />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
