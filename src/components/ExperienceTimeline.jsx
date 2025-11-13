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

const experiences = [
  {
    title: "Software Engineer",
    company: "Wisely",
    period: "February 2025 - November 2025",
    description: [
      "Designed and Implemented Web Application using React JS",
      "Created reusable Table Component",
      "Created input form for user",
      "Designed and Implemented Backend Application using Supabase",
      "Designed database schema and functions",
      "Designed Row Level Security for database tables",
    ],
  },
  {
    title: "Backend Engineer Intern",
    company: "Bank Central Asia (BCA)",
    period: "April 2024 - February 2025",
    description: [
        "Designed and implemented backend using spring boot version 3",
        "Created RESTful API (GET, POST, DELETE)",
        "Created internationalization API",
        "Created filter feature",
        "Migrated Backend of existing BCA Services",
        "Improve authentication from stateful architecture to stateless architecture" 
    ],
  },
  {
    title: "Frontend Engineer Intern",
    company: "Bank Central Asia (BCA)",
    period: "February 2024 – April 2024",
    description: [
      "Designed and Implemented website application using Angular JS framework with bootstrap version 3",
      "Designed and implemented inputs feature for user to input",
      "Designed and refactored components to optimize the feature"
    ],
  },
  {
    title: "Software Engineer",
    company: "Dev4You Nonprofit Platform (Final Year Thesis)",
    period: "2024 – 2025",
    description: [
        "Facilitated Collaboration between application developers and non profit organization by creating for project based engagement.",
        "Enable Non Profit Organization to post technical requirements, such as mobile apps and websites to address their challenges",
        "Recognize Developers Contribution to enhance their professional portfolios",
        "Built Using ReactJS and MUI for the frontend and NodeJS and ExpressJS for the backend",
        "Managed Database using PostgreSQL and used Kyseli as Object Relational Mapping (ORM)",
        "Deployed the Website using Google Cloud Platform (GCP)"
    ],
  },
];

export default function ExperienceTimeline() {
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
        Work Experience
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
