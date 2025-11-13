import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

export default function ProjectCard({ title, description, image, github, liveDemo }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        backgroundColor: "#112240",
        color: "white",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ color: "#64ffda" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", gap: 1, px: 1, pb: 1 }}>
          <Button
            size="small"
            variant="outlined"
            sx={{
              borderColor: "#64ffda",
              color: "#64ffda",
              "&:hover": { borderColor: "#52e0c4", color: "#52e0c4" },
            }}
            href={github}
            target="_blank"
          >
            GitHub
          </Button>

          {/* Conditionally render Live Demo button */}
          {liveDemo && (
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#64ffda",
                color: "#0a192f",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#52e0c4" },
              }}
              href={liveDemo}
              target="_blank"
            >
              Live Demo
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
