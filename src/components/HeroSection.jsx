import React from "react";
import { Box, Typography, Button, Stack, Avatar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import profilepicture from "../assets/profilepicture.jpg";
// import springboot from "../assets/tech stack logo/spring-boot.webp";
// import reactIcon from "../assets/tech stack logo/react-icon.png";
// import postgres from "../assets/tech stack logo/Postgresql.png";
// import oracledb from "../assets/tech stack logo/oracledb.png";
// import supabase from "../assets/tech stack logo/supabase.png";
// import nodejs from "../assets/tech stack logo/nodejs.svg"

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const techStack = [
    { name: "Spring Boot", logo: "/tech stack logo/spring-boot.webp" },
    { name: "React", logo: "/tech stack logo/React-icon.png" },
    { name: "PostgreSQL", logo:  "/tech stack logo/Postgresql.png"},
    { name: "OracleDB", logo: "/tech stack logo/oracledb.png" },
    { name: "Supabase", logo: "/tech stack logo/supabase.png" },
    { name: "Node.js", logo: "/tech stack logo/nodejs.svg" },
  ];

  return (
    <Box
      id="introduction"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 3,
        background: "linear-gradient(180deg, #0a192f 0%, #112240 100%)",
        color: "white",
      }}
    >
      {/* Profile Picture */}
      <Avatar
        alt="Jeremiah William Sebastian"
        src="/profilepicture.jpg"
        sx={{
          width: 150,
          height: 150,
          mb: 3,
          border: "4px solid #64ffda",
          boxShadow: "0 0 20px rgba(100, 255, 218, 0.3)",
        }}
      />

      <Typography
        variant="h5"
        sx={{ color: "#64ffda", mb: 1, fontWeight: 500 }}
      >
        Hi, I’m
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          mb: 2,
          fontSize: { xs: "2.5rem", md: "3.5rem" },
        }}
      >
        Jeremiah William Sebastian
      </Typography>

      <Typography
        variant="h5"
        sx={{
          color: "rgba(255,255,255,0.7)",
          mb: 3,
          fontWeight: 400,
          maxWidth: "600px",
        }}
      >
        A passionate <b>Backend Engineer</b> who enjoys building efficient,
        scalable, and meaningful software that helps people and businesses grow.
      </Typography>

      {/* Buttons */}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#64ffda",
            color: "#0a192f",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#52e0c4" },
          }}
          onClick={scrollToProjects}
        >
          View My Projects
        </Button>

        <Button
          variant="outlined"
          size="large"
          sx={{
            borderColor: "#64ffda",
            color: "#64ffda",
            fontWeight: "bold",
            "&:hover": {
              borderColor: "#52e0c4",
              color: "#52e0c4",
            },
          }}
          onClick={scrollToContact}
        >
          Contact Me
        </Button>
      </Stack>

      {/* ✅ Tech Stack Section */}
      <Box
        sx={{
          mt: 6,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {techStack.map((tech, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 80,
            }}
          >
            <Box
              component="img"
              src={tech.logo}
              alt={tech.name}
              sx={{
                width: 50,
                height: 50,
                mb: 1,
                filter: "drop-shadow(0 0 6px rgba(100, 255, 218, 0.4))",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontWeight: 500,
              }}
            >
              {tech.name}
            </Typography>
          </Box>
        ))}
      </Box>

      <KeyboardArrowDownIcon
        sx={{
          mt: 6,
          fontSize: 40,
          color: "#64ffda",
          animation: "bounce 1.5s infinite",
          "@keyframes bounce": {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-8px)" },
          },
        }}
      />
    </Box>
  );
}
