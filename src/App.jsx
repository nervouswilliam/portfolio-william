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
import fraud_detection_json from "./JSON/fraud_detection.json";
import HDB_json from "./JSON/HDB.json";
import query_json from "./JSON/query.json";
import EV_Infrastructure_json from "./JSON/EV_Infrastructure.json";
import social_network_json from "./JSON/social_network.json";
import machine_learning_json from "./JSON/AML.json";



export default function App() {
  return (
    <BrowserRouter> {/* 3. Wrap everything in BrowserRouter */}
      <ScrollToTop />
      <CssBaseline />
      <Navbar />

      <Routes> {/* 4. Define your paths here */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/hdb_project" element={<ProjectDetail />} />
        <Route path="/fraud_detection_project" element={<ProjectDetailDAL />} />
        <Route path="/query_optimization_project" element={<ProjectDetailQuery />} /> */}
        <Route path="/hdb_project" element={<ProjectDetailComponent data={HDB_json} />} />
        <Route path="/fraud_detection_project" element={<ProjectDetailComponent data={fraud_detection_json} />} />
        <Route path="/query_optimization_project" element={<ProjectDetailComponent data={query_json} />} />
        <Route path="/ev_infrastructure_project" element={<ProjectDetailComponent data={EV_Infrastructure_json} />} />
        <Route path="/social_network_analysis_project" element={<ProjectDetailComponent data={social_network_json} />} />
        <Route path="/machine_learning_project" element={<ProjectDetailComponent data={machine_learning_json} />} />
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  );  
}