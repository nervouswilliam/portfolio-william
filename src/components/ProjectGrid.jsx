import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Tooltip,
} from "@mui/material";

import {
  SiReact,
  SiMui,
  SiSupabase,
  SiNodedotjs,
  SiPostgresql,
  SiAndroid,
  SiSqlite,
} from "react-icons/si";
import { DiJava } from "react-icons/di";

import wisely from "/projects/wisely.png";
import dev4you from "/projects/Dev4You.png";
import cs2skin from "/projects/CesTwoSkin.png";

export default function ProjectGrid() {
  const techIcons = {
    react: { icon: <SiReact size={22} />, label: "React" },
    mui: { icon: <SiMui size={22} />, label: "Material UI" },
    supabase: { icon: <SiSupabase size={22} />, label: "Supabase" },
    nodejs: { icon: <SiNodedotjs size={22} />, label: "Node.js" },
    postgres: { icon: <SiPostgresql size={22} />, label: "PostgreSQL" },
    android: { icon: <SiAndroid size={22} />, label: "Android" },
    java: { icon: <DiJava size={24} />, label: "Java" },
    sqlite: { icon: <SiSqlite size={22} />, label: "SQLite" },
  };

  const projects = [
    {
      title: "Wisely",
      description:
        "A warehouse and sales tracking app that helps small businesses manage products, track expiration dates, and optimize restocks.",
      image: wisely,
      liveLink: "https://www.wisely.id",
      github: "https://github.com/nervouswilliam/WISE/tree/master/frontend",
      tech: ["react", "mui", "supabase"],
    },
    {
      title: "Dev4You",
      description:
        "A platform connecting nonprofits with developers to build websites and apps at minimal cost while helping developers gain real-world experience.",
      image: dev4you,
      github: "https://github.com/nervouswilliam/skripsi",
      tech: ["react", "mui", "nodejs", "postgres"],
    },
    {
      title: "CesTwoSkin",
      description:
        "A mobile application that enables gamers to buy, sell, and trade Counter-Strike 2 weapon skins securely and effortlessly.",
      image: cs2skin,
      github: "https://github.com/nervouswilliam/cestwo_skin",
      tech: ["android", "java", "sqlite"],
    },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 5, fontWeight: "bold" }}
      >
        Projects
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                maxWidth: 400,
                mx: "auto",
                borderRadius: 3,
                boxShadow: 4,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-6px)" },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={project.image}
                alt={project.title}
              />

              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{ fontWeight: "bold" }}
                >
                  {project.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>

                {/* Tech Icons Row */}
                <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
                  {project.tech.map((tech, i) => (
                    <Tooltip key={i} title={techIcons[tech].label} arrow>
                      <Box
                        sx={{
                          color: "grey", // Icon color
                          "&:hover": { color: "#64ffda", cursor: "pointer" }, // Optional hover effect
                          transition: "0.2s ease",
                        }}
                      >
                        {techIcons[tech].icon}
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </CardContent>

              <CardActions>
                {project.liveLink && (
                  <Button
                    size="small"
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </Button>
                )}

                <Button
                  size="small"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
