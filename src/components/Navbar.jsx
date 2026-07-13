import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../i18n";

const sectionIds = ["introduction", "experience", "projects", "education", "contact"];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [langAnchorEl, setLangAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLangMenu = (event) => setLangAnchorEl(event.currentTarget);
  const handleLangClose = () => setLangAnchorEl(null);
  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    handleLangClose();
    handleClose();
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
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
          onClick={() => scrollToSection("introduction")}
        />

        {/* ✅ Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
          {sectionIds.map((id) => (
            <Button
              key={id}
              color="inherit"
              onClick={() => scrollToSection(id)}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { color: "#64ffda" },
              }}
            >
              {t(`nav.${id}`)}
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
            href="/CV_WILLIAM.pdf"
            target="_blank"
          >
            {t("nav.downloadCV")}
          </Button>

          <IconButton
            color="inherit"
            onClick={handleLangMenu}
            aria-label={t("nav.language")}
            sx={{ "&:hover": { color: "#64ffda" } }}
          >
            <LanguageIcon />
          </IconButton>
        </Box>

        {/* ✅ Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <IconButton
            color="inherit"
            onClick={handleLangMenu}
            aria-label={t("nav.language")}
          >
            <LanguageIcon />
          </IconButton>

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
            {sectionIds.map((id) => (
              <MenuItem
                key={id}
                onClick={() => scrollToSection(id)}
                sx={{
                  "&:hover": { backgroundColor: "#112240", color: "#64ffda" },
                }}
              >
                {t(`nav.${id}`)}
              </MenuItem>
            ))}
            <MenuItem>
              <Button
                href="/CV_WILLIAM.pdf"
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
                {t("nav.downloadCV")}
              </Button>
            </MenuItem>
          </Menu>
        </Box>

        {/* ✅ Shared language menu — anchors to whichever globe icon (desktop or mobile) was clicked */}
        <Menu
          anchorEl={langAnchorEl}
          open={Boolean(langAnchorEl)}
          onClose={handleLangClose}
          PaperProps={{
            sx: { backgroundColor: "#0a192f", color: "white", minWidth: 160 },
          }}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <MenuItem
              key={lang.code}
              selected={i18n.resolvedLanguage === lang.code}
              onClick={() => changeLanguage(lang.code)}
              sx={{ "&:hover": { backgroundColor: "#112240", color: "#64ffda" } }}
            >
              {lang.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
