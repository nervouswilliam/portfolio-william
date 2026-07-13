import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Box, Typography, Paper } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import { useTranslation } from "react-i18next";

// company/period are locale-invariant (proper nouns / dates); title & description
// come from the active translation resource, matched by array index.
const experienceMeta = [
  { company: "Essilor Luxottica", period: "July 2026 - Present" },
  { company: "Wisely", period: "February 2025 - November 2025" },
  { company: "Bank Central Asia (BCA)", period: "April 2024 - February 2025" },
  { company: "Bank Central Asia (BCA)", period: "February 2024 – April 2024" },
  { company: "Dev4You Nonprofit Platform (Final Year Thesis)", period: "2024 – 2025" },
];

export default function ExperienceTimeline() {
  const { t } = useTranslation();
  const translatedItems = t("experience.items", { returnObjects: true });
  const experiences = experienceMeta.map((meta, i) => ({
    ...meta,
    title: translatedItems[i]?.title,
    description: translatedItems[i]?.description || [],
  }));

  return (
    <Box
      id="experience"
      sx={{
        py: 8,
        px: { xs: 2, sm: 4, md: 8 },
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        {t("experience.heading")}
      </Typography>

      <Timeline position="alternate">
        {experiences.map((exp, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {exp.period}
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot color="primary">
                <WorkIcon />
              </TimelineDot>
              {index < experiences.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h6" component="span" fontWeight="bold">
                  {exp.title}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                  {exp.company}
                </Typography>

                {/* Bullet point description */}
                <Box component="ul" sx={{ mt: 2, pl: 3 }}>
                  {exp.description.map((point, i) => (
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
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
