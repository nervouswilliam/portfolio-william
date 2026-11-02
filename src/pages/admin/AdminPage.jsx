import React, { useEffect, useState } from "react";
import { Alert, AppBar, Box, Button, CircularProgress, Container, Link, Paper, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { SECTION_IDS, SECTIONS } from "../../../api/_lib/sections.js";
import { AuthProvider } from "../../auth/AuthProvider";
import { useAuth } from "../../auth/AuthContext";
import SectionManager from "../../admin/SectionManager";

function Centered({ children }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 2, bgcolor: "#0a192f" }}>
      <Paper sx={{ p: 4, maxWidth: 480, width: "100%" }}>{children}</Paper>
    </Box>
  );
}

function Setup() {
  return (
    <Centered>
      <Typography variant="h5" fontWeight={700} gutterBottom>Admin is not set up yet</Typography>
      <Typography color="text.secondary">
        This site has no Supabase backend configured. Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your
        environment, apply <code>supabase/schema.sql</code>, and redeploy. Until then the site simply shows its built-in content.
      </Typography>
    </Centered>
  );
}

function Dashboard() {
  const { email, signOut } = useAuth();
  const [section, setSection] = useState(SECTION_IDS[0]);
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="sticky" sx={{ bgcolor: "#0a192f" }}>
        <Toolbar sx={{ gap: 2, flexWrap: "wrap" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Content admin</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>{email}</Typography>
          <Button color="inherit" component={Link} href="/" sx={{ textTransform: "none" }}>View site</Button>
          <Button color="inherit" variant="outlined" onClick={signOut} sx={{ textTransform: "none" }}>Sign out</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Tabs value={section} onChange={(_, v) => setSection(v)} sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}>
          {SECTION_IDS.map((id) => <Tab key={id} value={id} label={SECTIONS[id].label} />)}
        </Tabs>
        <SectionManager key={section} section={section} />
      </Container>
    </Box>
  );
}

// After a failed Google sign-in, Supabase sends you back with the reason in the URL.
function readAuthError() {
  const query = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const code = query.get("error_code") || hash.get("error_code") || "";
  const description = query.get("error_description") || hash.get("error_description") || "";
  if (!code && !description && !query.get("error") && !hash.get("error")) return "";
  if (code === "signup_disabled") {
    return "Sign-ups are turned off in Supabase, and this account has not signed in before. Turn on \"Allow new users to sign up\" once (Authentication → Sign In / Providers), sign in, then turn it off again.";
  }
  return description || "Sign-in failed. Please try again.";
}

function Gate() {
  const { status, signIn, signOut, email } = useAuth();
  const [authError] = useState(readAuthError);

  // The admin must never be indexed.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    const previousTitle = document.title;
    document.title = "Admin";
    return () => {
      meta.remove();
      document.title = previousTitle;
    };
  }, []);

  if (status === "unconfigured") return <Setup />;
  if (status === "loading" || status === "checking") {
    return (
      <Centered>
        <Box sx={{ textAlign: "center" }}><CircularProgress /></Box>
      </Centered>
    );
  }
  if (status === "signed-out") {
    return (
      <Centered>
        <Typography variant="h5" fontWeight={700} gutterBottom>Sign in</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Only the site owner can edit content.</Typography>
        {authError && <Alert severity="error" sx={{ mb: 3 }}>{authError}</Alert>}
        <Button fullWidth size="large" variant="contained" startIcon={<GoogleIcon />} onClick={signIn}>Continue with Google</Button>
      </Centered>
    );
  }
  if (status === "not-owner") {
    return (
      <Centered>
        <Alert severity="error" sx={{ mb: 2 }}>
          {email ? `${email} is not allowed to edit this site.` : "This account is not allowed to edit this site."}
        </Alert>
        <Button fullWidth variant="outlined" onClick={signOut}>Sign out</Button>
      </Centered>
    );
  }
  return <Dashboard />;
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
