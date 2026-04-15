import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Navbar from "./utils/NavBar";
import Footer from "./utils/Footer";
import TopBar from "./utils/TopBar";


import LandingPage from "./Components/LandingPage.jsx";
import AboutPage from "./Components/AboutPage.jsx"; 
import ContactPage from "./Components/ContactPage.jsx"; 
import AdminDashboard from "./Components/AdminDashboard.jsx";



const App = () => {
  return (
    
      <div className="zellige-landing">
        <TopBar />
        <Navbar />

        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        </Routes>

        <Footer />
      </div>
    
  );
};

export default App;