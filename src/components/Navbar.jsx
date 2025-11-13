import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const sections = ["Introduction", "Experience", "Projects", "Education", "Contact"];

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const scrollToSection = (id) => {
    document.getElementById(id.toLowerCase()).scrollIntoView({ behavior: "smooth" });
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#0a192f",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* ✅ Logo */}
        <Box
          component="img"
          src="/logoNavbar.png"
          alt="Logo"
          sx={{
            height: 45,
            width: "auto",
            cursor: "pointer",
            borderRadius: "8px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 10px rgba(100, 255, 218, 0.5)",
            },
          }}
          onClick={() => scrollToSection("Introduction")}
        />

        {/* ✅ Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {sections.map((sec) => (
            <Button
              key={sec}
              color="inherit"
              onClick={() => scrollToSection(sec)}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { color: "#64ffda" },
              }}
            >
              {sec}
            </Button>
          ))}

          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                borderColor: "#64ffda",
                color: "#64ffda",
              },
            }}
            href="/CV_JEREMIAH_WILLIAM_SEBASTIAN.pdf"
            target="_blank"
          >
            Download CV
          </Button>
        </Box>

        {/* ✅ Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                backgroundColor: "#0a192f",
                color: "white",
                minWidth: 180,
              },
            }}
          >
            {sections.map((sec) => (
              <MenuItem
                key={sec}
                onClick={() => scrollToSection(sec)}
                sx={{
                  "&:hover": { backgroundColor: "#112240", color: "#64ffda" },
                }}
              >
                {sec}
              </MenuItem>
            ))}
            <MenuItem>
              <Button
                href="/CV_JEREMIAH_WILLIAM_SEBASTIAN.pdf"
                target="_blank"
                fullWidth
                sx={{
                  color: "#64ffda",
                  borderColor: "#64ffda",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(100,255,218,0.1)",
                  },
                }}
              >
                Download CV
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
