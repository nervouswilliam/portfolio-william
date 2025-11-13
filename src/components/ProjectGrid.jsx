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
} from "@mui/material";

import wisely from "../../public/projects/wisely.png";
import dev4you from "../../public/projects/Dev4You.png";
import cs2skin from "../../public/projects/CesTwoSkin.png";

export default function ProjectGrid() {
  const projects = [
    {
      title: "Wisely",
      description:
        "A warehouse and sales tracking app that helps small businesses manage products, track expiration dates, and optimize restocks.",
      image: wisely,
      liveLink: "https://www.wisely.id",
      github: "https://github.com/nervouswilliam/WISE/tree/master/frontend",
    },
    {
      title: "Dev4You",
      description:
        "A platform connecting nonprofit organizations with developers to build websites and apps at minimal cost and allow developers gain experience.",
      image: dev4you,
      github: "https://github.com/nervouswilliam/skripsi",
    },
    {
      title: "CesTwoSkin",
      description:
        "A mobile application that enables gamers to buy, sell, and trade Counter-Strike 2 weapon skins securely and effortlessly.",
      image: cs2skin,
      github: "https://github.com/nervouswilliam/cestwo_skin",
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
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </CardContent>

              <CardActions>
                {/* ✅ Only render Live Demo button if liveLink exists */}
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
