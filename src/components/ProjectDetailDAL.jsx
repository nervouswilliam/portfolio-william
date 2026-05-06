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

const ProjectDetailDAL = ({ projectTitle = "Fraud Detection", onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const techIcons = {
    react: { icon: <SiReact size={20} />, label: "React", color: "#61DAFB" },
    mui: { icon: <SiMui size={20} />, label: "Material UI", color: "#007FFF" },
    python: { icon: <SiPython size={20} />, label: "Python", color: "#3776AB" },
    knime: { icon: <SiPython size={20} />, label: "KNIME Analytics", color: "#FDB515" },
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
          variant="contained"
          sx={{
            mt: 6, 
            mb: 4, 
            position: 'relative',
            zIndex: 10,
            color: '#fff',
            backgroundColor: 'primary.main',
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
            Study on Fraud Detection Prediction
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Classification-Based Predictive Modelling for UK Fashion Retail Digital Payments
          </Typography>
        </Box>

        {/* Navigation Tabs */}
        <Paper sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Methodology" />
            <Tab label="Results & Analysis" />
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
                    This research conducts a classification-based predictive modelling framework to better help identify fraudulent transactions in the retail sector with the growth of digital payment systems. With outdated fraud detection systems failing to detect new and evolving fraud patterns, customer confidence is shaken, potentially hindering digital economy growth.
                  </Typography>
                  <Typography variant="body2" paragraph color="text.secondary">
                    This study provides retailers with the means and tools for better fraud management and prevention by comparing three classification models: Logistic Regression, Decision Tree, and Random Forest. The analysis employs KNIME Analytics Platform to develop and evaluate models on 1,000 transaction records from the UK fashion digital payments sector.
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
                        primary="Analyse transaction characteristics and behavioural indicators associated with fraudulent payments."
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Develop predictive models that classify transactions as fraudulent or legitimate."
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Compare the performance of different classification models."
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Provide insights on how analytics can support fraud detection in online retail operations."
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Dataset Details
                  </Typography>
                  <Typography variant="body2" paragraph color="text.secondary">
                    The UK Fashion Digital Payments Fraud dataset contains 1,000 transaction-level records with the following characteristics:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Transaction characteristics"
                        secondary="Amount, items count, discount %, payment type, channel"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Behavioural indicators"
                        secondary="Failed login attempts, device changes, transaction velocity"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Risk indicators"
                        secondary="IP risk score, billing/shipping distance, address indicators, returns, chargebacks"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Final Variables"
                        secondary="36 variables (24 original + 12 derived/engineered)"
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
                    <Chip
                      label="KNIME Analytics"
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Chip
                      label="Logistic Regression"
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Chip
                      label="Decision Tree"
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Chip
                      label="Random Forest"
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />
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
                        secondary="ISSS602 - Data Analytics Lab"
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
                        secondary="AY 2026-27 (January)"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Focus"
                        secondary="UK Fashion Retail"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Dataset Stats
                  </Typography>
                  <Chip
                    label="1,000 Transactions"
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="caption" display="block" color="text.secondary">
                    Fraud Rate: ~4.4%
                  </Typography>
                  <Typography variant="caption" display="block" color="text.secondary">
                    44 Fraud Cases / 956 Non-Fraud
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
                    Data Preparation
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Data Transformation
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      The is_fraud variable was converted from integer to string format for compatibility with machine learning learners. Categorical variables were transformed using one-to-many encoding, converting them into binary numerical format for model interpretation.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Feature Engineering
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Four engineered features were created to provide explicit indicators for fraudulent behavior: behavior_risk_score, risk_intensity, avg_item_value, and velocity_ratio.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Multicollinearity Check
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Correlation analysis was performed using a correlation matrix. Variables with correlation scores above 0.7 were excluded using column filter nodes to prevent variance inflation in coefficient estimates.
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Data Balancing
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      SMOTE (Synthetic Minority Over-sampling Technique) was deployed to address dataset imbalance by generating synthetic records for the minority fraud class. Dataset split: 70% training, 30% testing.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Classification Models
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                          Logistic Regression
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Binary classification with Stochastic Average Gradient optimization and Max Youden's Index for optimal threshold selection
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                          Decision Tree
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Gini index quality measure with Minimum Description Length (MDL) to balance complexity and predictive power
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                          Random Forest
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Ensemble learning with 250 decision trees using information gain as split criterion
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                          Data Normalization
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Applied only to Logistic Regression (sensitive to data scale); not applied to tree-based models
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
                    Model Performance Results
                  </Typography>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Logistic Regression (Selected Model)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Recall: 92.3%</strong> - Successfully identified 12 out of 13 fraudulent transactions, demonstrating strong capability in capturing anomalies. <strong>Precision: 7.27%</strong> - High false-positive rate, but trade-off is acceptable as it minimizes fraud leakage. <strong>Accuracy: 48.5%</strong> with <strong>AUC: 0.723</strong> - Selected as preferred model due to superior recall performance.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "info.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Random Forest
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Recall: 76.92%</strong> - Correctly identified 10 out of 13 fraud cases, showing improved performance over Decision Tree. <strong>Precision: 6.06%</strong> - Still maintains high false positives. <strong>Accuracy: 47.33%</strong> - Reflects aggressive approach prioritizing fraud detection over overall accuracy.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "warning.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Decision Tree
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Recall: 61.54%</strong> - Correctly identified 8 out of 13 fraud cases, with moderate fraud detection capability. <strong>Precision: 5.67%</strong> - 133 non-fraud transactions misclassified as fraud. <strong>Accuracy: 54.00%</strong> - Moderate performance with limited effectiveness in balancing detection.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "info.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Key Findings from EDA
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      • <strong>Class Imbalance Challenge:</strong> Only 4.4% fraud rate (44 fraud vs 956 non-fraud) presents significant classification challenge.<br/>
                      • <strong>Fraudster Patterns:</strong> Most fraud occurs in newer accounts (0-500 days) with lower transaction amounts (&lt;100 GBP).<br/>
                      • <strong>Risk Indicators:</strong> Failed login attempts and higher risk intensity are key fraud indicators.<br/>
                      • <strong>Multi-dimensional Anomalies:</strong> Fraudsters minimize detection by using overlapping patterns across email domain risk scores, channels, and account age.
                    </Typography>
                  </Box>

                  <Box sx={{ p: 2, bgcolor: "error.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Model Selection Justification
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Logistic Regression was selected despite lower precision because missing fraudulent cases (false negatives) result in significant financial losses. The 92.3% recall ensures maximum fraud detection, while high false positives can be managed through manual verification by human agents before action is taken on suspicious transactions.
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
                      { name: "Chan Guang Hua", affiliation: "SMU" },
                      { name: "Chong Jia Min Heidi", affiliation: "SMU" },
                      { name: "Jeremiah William Sebastian", affiliation: "SMU" },
                    ].map((member, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            {member.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {member.affiliation}
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

export default ProjectDetailDAL;