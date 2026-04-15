import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import {
  SiReact,
  SiMui,
  SiSupabase,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
} from "react-icons/si";

const ProjectDetail = ({ projectTitle = "HDB Research", onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const techIcons = {
    react: { icon: <SiReact size={20} />, label: "React", color: "#61DAFB" },
    mui: { icon: <SiMui size={20} />, label: "Material UI", color: "#007FFF" },
    python: { icon: <SiPython size={20} />, label: "Python", color: "#3776AB" },
    postgresql: {
      icon: <SiPostgresql size={20} />,
      label: "PostgreSQL",
      color: "#336791",
    },
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="lg">
        <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        variant="contained" // Change from "text" to "contained" to give it a physical background
        sx={{
            mt: 6, 
            mb: 4, 
            position: 'relative',
            zIndex: 10,
            color: '#fff', // Force white text
            backgroundColor: 'primary.main', // Force your theme's primary color
            '&:hover': {
            backgroundColor: 'primary.dark',
            }
        }}
        >
        Back to Projects
        </Button>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Repricing the HDB Market
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            A Statistical Reassessment of Value Drivers in Post-COVID Singapore
          </Typography>
        </Box>

        {/* Navigation Tabs */}
        <Paper sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Methodology" />
            <Tab label="Key Findings" />
            <Tab label="Team" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Project Info Card */}
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Project Overview
                  </Typography>
                  <Typography variant="body1" paragraph color="text.secondary">
                    This project conducted an in-depth statistical analysis to examine
                    the causal relationships and impacts of various factors on HDB
                    Resale Flat prices in Singapore's West region. The study analyzes
                    transactions from 2015-2024, providing a comprehensive 10-year
                    analysis comparing pre-COVID and post-COVID periods.
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ fontStyle: "italic" }}>
                    Rather than focusing solely on prediction accuracy, this research
                    emphasizes pure statistical reasoning in data to understand true
                    value drivers in the HDB resale market.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Research Objectives
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="How has the influence of different factors on HDB resale flat prices changed before and after COVID-19?"
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="To what extent does the remaining lease affect the price per square meter (PSM) of HDB resale flats?"
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="How do income and macroeconomic factors influence HDB resale flat prices in the West region before & after COVID?"
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Data Sources
                  </Typography>
                  <Typography variant="body2" paragraph color="text.secondary">
                    All datasets were obtained from Singapore Government's official
                    open-data portals:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="HDB Resale Flat Transactions (Jan 2015 – Jan 2026)"
                        secondary="from HDB (data.gov.sg)"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="MRT & Bus Station Data"
                        secondary="from OneMap (onemap.gov.sg)"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Economic Indicators (Unemployment, GDP Growth, Interest Rates)"
                        secondary="from SingStat and MAS"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Tech Stack
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {Object.entries(techIcons).map(([key, { icon, label }]) => (
                      <Chip
                        key={key}
                        icon={icon}
                        label={label}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Course Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Course"
                        secondary="IS630 - Statistical Thinking for Data Science"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Institution"
                        secondary="Singapore Management University"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Term"
                        secondary="January Term, AY 2025/26"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Focus Region"
                        secondary="West Singapore"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Data Range
                  </Typography>
                  <Chip
                    label="2015-2024 (10 years)"
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="caption" display="block" color="text.secondary">
                    Pre-COVID: 2015-2019
                  </Typography>
                  <Typography variant="caption" display="block" color="text.secondary">
                    Post-COVID: 2020-2024
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Analytical Approaches
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Exploratory Data Analysis (EDA)
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Initial data visualization and statistical summaries including
                      box plots, heatmaps, and correlation analyses to identify patterns
                      and relationships in the data.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Inferential Statistics
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Hypothesis testing using ANOVA, Mann-Whitney U tests, and
                      Kruskal-Wallis tests to validate observed trends and determine
                      statistical significance.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Regression Modelling
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Multi-linear regression and OLS regression models to quantify
                      the independent contribution of each variable to resale prices,
                      controlling for housing characteristics and location effects.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Statistical Tests Performed
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                          Spearman's Correlation
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          To check for multicollinearity between variables
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                          Two-way ANOVA
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          To analyze impact of convenience and time factors
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                          Tukey HSD Test
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          To quantify differences between factor groups
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                          Kruskal-Wallis Test
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          For non-parametric distribution comparisons
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                          Mann-Whitney U Test
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          To compare pre and post-COVID periods
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                          OLS Regression
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          To quantify macroeconomic variable contributions
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Key Findings
                  </Typography>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "info.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Post-COVID Market Shift
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      The HDB market experienced a structural price increase after 2020,
                      with prices rising from $250K-$400K pre-COVID to over $500K
                      post-COVID. This represents a $183.9K mean increase in sale prices.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Convenience Premium
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      High convenience locations (scores 80-100) command a $33.9K
                      premium over medium convenience areas. Post-COVID, buyers are
                      willing to pay exponentially more for accessibility and proximity
                      to transit.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "warning.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Floor Level Importance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Floor level has emerged as a critical post-COVID driver, with clear
                      premiums for units above the 25th floor. Room type remains the
                      primary factor but is no longer the sole determinant.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "error.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Declining Affordability
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price-to-Income Ratio (PIR) shows severe deterioration post-COVID,
                      indicating worsening affordability. Pre-COVID saw gradual decline
                      in PIR (improving affordability), but 2020 onwards shows sharp
                      spikes indicating structural affordability crisis.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "info.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Remaining Lease Impact
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Non-linear positive association between remaining lease and PSM.
                      Price drops sharply for leases under 70 years, then stabilizes.
                      Post-COVID, buyers are increasingly purchasing older flats,
                      possibly due to affordability constraints.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Income as Key Driver
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Household income is the strongest macroeconomic driver. A S$1,000
                      increase in median household income is associated with ~6.7%
                      increase in resale prices, reflecting purchasing power effects.
                    </Typography>
                  </Box>

                  <Box sx={{ p: 2, bgcolor: "info.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Location Remains Critical
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Clementi consistently commands the highest prices due to proximity
                      to universities and amenities. Post-COVID, Bukit Batok has also
                      risen significantly. Location remains a key determinant of resale
                      value.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                    Research Team
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      { name: "Kelvin Andikko", matricNo: "01533318" },
                      { name: "Jeremiah William Sebestian", matricNo: "01549441" },
                      { name: "Heidi Chong Jia Min", matricNo: "01464078" },
                      { name: "Lim Eng Soon", matricNo: "01550636" },
                      { name: "Atharva Dipak Bhavsar", matricNo: "01548558" },
                      { name: "Prajapati Parth Jignesh", matricNo: "01548275" },
                      { name: "Varun Kumar Konjeti", matricNo: "01550808" },
                    ].map((member, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            {member.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Matric: {member.matricNo}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ProjectDetail;