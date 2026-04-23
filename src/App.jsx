// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


// import Navbar from "./utils/NavBar";
// import Footer from "./utils/Footer";
// import TopBar from "./utils/TopBar";


// import LandingPage from "./Components/LandingPage.jsx";
// import AboutPage from "./Components/AboutPage.jsx"; 
// import ContactPage from "./Components/ContactPage.jsx"; 
// import AdminDashboard from "./Components/AdminDashboard.jsx";



// const App = () => {
//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith("/AdminDashboard");
//   return (
    
//       <div className="zellige-landing">
//         {!isAdminRoute && (
//         <>
//           <TopBar />
//           <Navbar />
//         </>
//       )}

//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />

       
//         <Route path="/AdminDashboard" element={<AdminDashboard />} />
//       </Routes>

      
//       {!isAdminRoute && <Footer />}
//       </div>
    
//   );
// };

// export default App;


// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import LandingPage from "./Components/LandingPage.jsx";
// import AboutPage from "./Components/AboutPage.jsx";
// import ContactPage from "./Components/ContactPage.jsx";
// import AdminDashboard from "./Components/AdminDashboard.jsx";

// import PublicLayout from "./utils/PublicLayout.jsx";
// import ScrollToTop from "./utils/ScrollToTop";
// import LoginPage from "./Components/LoginPage.jsx";

// const App = () => {
//   return (
//     <>
//     <ScrollToTop />
//     <Routes>

      

//       {/* PUBLIC PAGES */}
//       <Route element={<PublicLayout />}>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//       </Route>

//       {/* ADMIN (NO LAYOUT) */}
//       <Route path="/AdminDashboard" element={<AdminDashboard />} />

//       <Route path="/LoginPage" element={<LoginPage/>}/>

//     </Routes>
//     </>
//   );
// };

// export default App;




import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "./Components/LandingPage.jsx";
import AboutPage from "./Components/AboutPage.jsx";
import ContactPage from "./Components/ContactPage.jsx";
import AdminDashboard from "./Components/AdminDashboard.jsx";

import PublicLayout from "./utils/PublicLayout.jsx";
import ScrollToTop from "./utils/ScrollToTop";
import LoginPage from "./Components/LoginPage.jsx";
import ProtectedRoute from "./utils/ProtectedRoute";
import OrderStatusMap from "./Components/OrderStatusMap.jsx";
import ClientOrderCheck from "./Components/Client_OrderCheck.jsx";
const App = () => {
  const location = useLocation();

 

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* PUBLIC PAGES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* ADMIN */}
        <Route
  path="/AdminDashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

        {/* LOGIN */}
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Order/:id" element={<OrderStatusMap/>} />
        <Route path="/OrderInformations" element={<ClientOrderCheck/>} />
      </Routes>
    </>
  );
};

export default App;