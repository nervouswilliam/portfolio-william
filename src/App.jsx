import React from "react";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/home";

export default function App() {
  return (
    <>
      {/* Resets CSS defaults for consistency */}
      <CssBaseline />

      {/* Fixed navigation bar */}
      <Navbar />

      {/* Main content */}
      <Home />
    </>
  );
}
