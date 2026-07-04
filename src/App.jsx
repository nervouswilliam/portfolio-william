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
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import ScrollToTop from "./components/ScrollToTop"; // 3. Import ScrollToTop component
import ProjectDetailComponent from "./components/ProjectDetailComponent";
import fraud_detection_json from "./JSON/fraud_detection.json";
import HDB_json from "./JSON/HDB.json";
import query_json from "./JSON/query.json";


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
      </Routes>
    </BrowserRouter>
  );  
}