// import React from "react";
// import { CssBaseline } from "@mui/material";
// import Navbar from "./components/Navbar";
// import Home from "./pages/home";

// export default function App() {
//   return (
//     <>
//       {/* Resets CSS defaults for consistency */}
//       <CssBaseline />

//       {/* Fixed navigation bar */}
//       <Navbar />

//       {/* Main content */}
//       <Home />
//     </>
//   );  
// }
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // 1. Import these
import { CssBaseline } from "@mui/material";
import ChatWidget from "./components/ChatWidget";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import ScrollToTop from "./components/ScrollToTop"; // 3. Import ScrollToTop component
import ProjectDetailComponent from "./components/ProjectDetailComponent";

export default function App() {
  return (
    <BrowserRouter> {/* 3. Wrap everything in BrowserRouter */}
      <ScrollToTop />
      <CssBaseline />
      <Navbar />

      <Routes> {/* 4. Define your paths here */}
        <Route path="/" element={<Home />} />
        <Route path="/hdb_project" element={<ProjectDetailComponent projectKey="hdb" />} />
        <Route path="/fraud_detection_project" element={<ProjectDetailComponent projectKey="fraud_detection" />} />
        <Route path="/query_optimization_project" element={<ProjectDetailComponent projectKey="query_optimization" />} />
        <Route path="/ev_infrastructure_project" element={<ProjectDetailComponent projectKey="ev_infrastructure" />} />
        <Route path="/social_network_analysis_project" element={<ProjectDetailComponent projectKey="social_network_analysis" />} />
        <Route path="/machine_learning_project" element={<ProjectDetailComponent projectKey="machine_learning" />} />
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  );
}