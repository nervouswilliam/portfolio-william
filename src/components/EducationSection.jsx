import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

// school/period/gpa are locale-invariant; degree & description come from the
// active translation resource, matched by array index.
const educationMeta = [
  { school: "Singapore Management University (SMU)", period: "2026-2027", gpa: "3.58 / 4.00" },
  { school: "Bina Nusantara University (BINUS)", period: "2021-2025", gpa: "3.67 / 4.00" },
];

export default function EducationSection() {
  const { t } = useTranslation();
  const translatedItems = t("education.items", { returnObjects: true });
  const educationData = educationMeta.map((meta, i) => ({
    ...meta,
    degree: translatedItems[i]?.degree,
    description: translatedItems[i]?.description || [],
  }));

  return (
    <Box
      id="education"
      sx={{
        py: 8,
        px: { xs: 2, sm: 4, md: 8 },
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        {t("education.heading")}
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        {educationData.map((edu, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {edu.degree}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary">
                {edu.school}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {edu.period}
              </Typography>

              {/* Description as bullet list */}
              <Box component="ul" sx={{ mt: 2, pl: 3 }}>
                {edu.description.map((point, i) => (
                  <Typography
                    key={i}
                    component="li"
                    variant="body1"
                    sx={{ mb: 1 }}
                  >
                    {point}
                  </Typography>
                ))}
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, fontStyle: "italic" }}
              >
                {t("education.gpaLabel")}: {edu.gpa}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
