import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import ChatWidget from "./components/ChatWidget";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import ScrollToTop from "./components/ScrollToTop";
import ProjectDetailRoute from "./pages/ProjectDetailRoute";

// The editor is only downloaded by the owner, never by regular visitors.
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));

// The original project URLs keep working; each one maps to a project slug.
const LEGACY_PROJECT_ROUTES = {
  hdb_project: "hdb-resale",
  fraud_detection_project: "fraud-detection",
  query_optimization_project: "query-optimization",
  ev_infrastructure_project: "ev-infrastructure",
  social_network_analysis_project: "social-network-analysis",
  machine_learning_project: "machine-learning",
  agentic_risk_project: "agentic-risk",
};

function Shell() {
  const isAdmin = useLocation().pathname.startsWith("/admin");
  return (
    <>
      <ScrollToTop />
      <CssBaseline />
      {!isAdmin && <Navbar />}

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          {Object.entries(LEGACY_PROJECT_ROUTES).map(([path, slug]) => (
            <Route key={path} path={`/${path}`} element={<ProjectDetailRoute slug={slug} />} />
          ))}
          <Route path="/projects/:slug" element={<ProjectDetailRoute />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>

      {!isAdmin && <ChatWidget />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
