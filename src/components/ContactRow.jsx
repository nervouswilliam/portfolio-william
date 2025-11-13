import React from "react";
import { Box, IconButton, Typography, Stack, Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function ContactRow() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Let's Connect
      </Typography>

      <Stack
        direction="row"
        justifyContent="center"
        spacing={3}
        sx={{ mt: 2 }}
      >
        <Link
          href="https://www.linkedin.com/in/jeremiah-william-sebastian-5ab68b117"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton
            sx={{
              color: "#0A66C2",
              "&:hover": { backgroundColor: "rgba(10, 102, 194, 0.1)" },
            }}
          >
            <LinkedInIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Link>

        <Link
          href="https://github.com/nervouswilliam"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton
            sx={{
              color: "black",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
            }}
          >
            <GitHubIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Link>
      </Stack>

      <Typography
        variant="body2"
        sx={{ mt: 3, color: "text.secondary", fontSize: "0.9rem" }}
      >
        © {new Date().getFullYear()} Jeremiah William Sebastian
      </Typography>
    </Box>
  );
}
