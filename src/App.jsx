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
import ProjectDetail from "./components/ProjectDetail"; // 2. Import your details page
import ScrollToTop from "./components/ScrollToTop"; // 3. Import ScrollToTop component

export default function App() {
  return (
    <BrowserRouter> {/* 3. Wrap everything in BrowserRouter */}
      <ScrollToTop />
      <CssBaseline />
      <Navbar />

      <Routes> {/* 4. Define your paths here */}
        <Route path="/" element={<Home />} />
        <Route path="/hdb_project" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );  
}