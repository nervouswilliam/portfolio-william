import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import cvpdf from "../../public/CV JEREMIAH WILLIAM SEBASTIAN.docx.pdf"

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
    <AppBar position="fixed" sx={{ backgroundColor: "#0a192f" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          William
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {sections.map((sec) => (
            <Button key={sec} color="inherit" onClick={() => scrollToSection(sec)}>
              {sec}
            </Button>
          ))}
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "white" }}
            href="/CV JEREMIAH WILLIAM SEBASTIAN.docx.pdf"
            target="_blank"
          >
            Download CV
          </Button>
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {sections.map((sec) => (
              <MenuItem key={sec} onClick={() => scrollToSection(sec)}>
                {sec}
              </MenuItem>
            ))}
            <MenuItem>
              <Button href="/CV JEREMIAH WILLIAM SEBASTIAN.docx.pdf" target="_blank" fullWidth>
                Download CV
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
