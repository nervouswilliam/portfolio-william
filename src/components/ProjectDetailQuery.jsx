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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const ProjectDetailQuery = ({ projectTitle = "Query Processing", onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

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
            Query Processing and Optimization
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Making Generated Columns for SARGABLE Query Optimization
          </Typography>
        </Box>

        {/* Navigation Tabs */}
        <Paper sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Problem & Solution" />
            <Tab label="Results & Comparison" />
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
                    This project demonstrates query optimization techniques using generated columns in MySQL to create SARGABLE (Search ARGument ABLE) queries. The study uses a realistic scenario of a jewelry store conducting a birthday-month promotion campaign, showing how to efficiently identify customers born in a specific month.
                  </Typography>
                  <Typography variant="body2" paragraph color="text.secondary">
                    By implementing generated columns and optimizing query predicates, we achieve significant performance improvements while maintaining data accuracy and consistency through automation. The project compares traditional unoptimized queries against SARGABLE optimized queries.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Business Scenario
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Context"
                        secondary="Jewelry store owner wants to run a birthday-month promotion campaign"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Challenge"
                        secondary="How to verify customer information and identify customers born in a specific month"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Goal"
                        secondary="Send targeted promotional offers to customers with birthdays in the selected month"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Solution"
                        secondary="Implement generated columns for efficient query processing"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Dataset Overview
                  </Typography>
                  <Typography variant="body2" paragraph color="text.secondary">
                    Synthetic customer dataset created for demonstration purposes, loaded into MySQL using bulk data loading.
                  </Typography>
                  <TableContainer sx={{ mb: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>Column Name</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Data Type</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Purpose</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>customer_id</TableCell>
                          <TableCell>INT (PK)</TableCell>
                          <TableCell>Unique customer ID</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>first_name</TableCell>
                          <TableCell>VARCHAR(50)</TableCell>
                          <TableCell>Customer's first name</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>last_name</TableCell>
                          <TableCell>VARCHAR(50)</TableCell>
                          <TableCell>Customer's last name</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>email</TableCell>
                          <TableCell>VARCHAR(120)</TableCell>
                          <TableCell>Contact information</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>date_of_birth</TableCell>
                          <TableCell>DATE</TableCell>
                          <TableCell>Original birthday field</TableCell>
                        </TableRow>
                        <TableRow sx={{ backgroundColor: "#e8f5e9" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>birth_month</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>TINYINT</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Generated from date_of_birth</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography variant="caption" color="text.secondary">
                    Note: birth_month is a generated column extracted from date_of_birth for query optimization
                  </Typography>
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
                      label="MySQL"
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Chip
                      label="Generated Columns"
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Chip
                      label="Query Optimization"
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Chip
                      label="SARGABLE Predicates"
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
                        secondary="ISSS625 - Query Processing and Optimisation"
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
                        primary="Focus"
                        secondary="Database Performance Optimization"
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Project Highlights
                  </Typography>
                  <Chip
                    label="15x Fewer Logical Reads"
                    color="success"
                    variant="outlined"
                    sx={{ mb: 1, width: "100%" }}
                  />
                  <Chip
                    label="1.4 Seconds Faster"
                    color="success"
                    variant="outlined"
                    sx={{ mb: 1, width: "100%" }}
                  />
                  <Chip
                    label="O(log n) Complexity"
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 1, width: "100%" }}
                  />
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
                    Understanding Generated Columns
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      What Are Generated Columns?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Generated columns are calculated from other columns in the same row. They automatically compute values based on expressions applied to other columns, eliminating the need for manual calculations and reducing errors.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Two Types of Generated Columns
                    </Typography>
                    <List dense>
                      <ListItem>
                        <Typography variant="body2" sx={{ fontWeight: "bold", mr: 1 }}>
                          Virtual Columns:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Computed when queried, not stored in the table. Saves storage space but requires computation on each query.
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography variant="body2" sx={{ fontWeight: "bold", mr: 1 }}>
                          Stored Columns:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Computed once and saved in the table. Uses more storage but improves query performance and enables indexing.
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Query Optimization Approach
                  </Typography>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "warning.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                      Without Optimization (Query 1)
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Approach:</strong> Extract birth month on-the-fly using MONTH() function on date_of_birth
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Complexity:</strong> O(n) - Must scan ALL rows and compute MONTH() for each
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Cost:</strong> 208,580 (full table scan) | <strong>Speed:</strong> 5.337 seconds
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                      With Optimization (Query 2)
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Approach:</strong> Use SARGABLE generated column (birth_month) with indexed lookup
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Complexity:</strong> O(log n + k) - Index lookup plus fetch matching rows
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Cost:</strong> 62,686 (index range scan) | <strong>Speed:</strong> 3.920 seconds
                    </Typography>
                  </Box>

                  <Box sx={{ p: 2, bgcolor: "info.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      What Makes It SARGABLE?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SARGABLE (Search ARGument ABLE) predicates enable the query optimizer to use indexes efficiently. By moving the calculation into a generated column and indexing it, the database can use index range scans instead of full table scans.
                    </Typography>
                  </Box>
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
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                    Performance Comparison
                  </Typography>

                  <TableContainer sx={{ mb: 3 }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>Metric</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }} align="center">Without Optimization</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }} align="center">With Generated Column</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }} align="center">Improvement</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>Complexity</TableCell>
                          <TableCell align="center">O(n)</TableCell>
                          <TableCell align="center" sx={{ color: "green", fontWeight: "bold" }}>O(log n + k)</TableCell>
                          <TableCell align="center">Polynomial</TableCell>
                        </TableRow>
                        <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>Cost</TableCell>
                          <TableCell align="center">208,580</TableCell>
                          <TableCell align="center" sx={{ color: "green", fontWeight: "bold" }}>62,686</TableCell>
                          <TableCell align="center" sx={{ color: "green", fontWeight: "bold" }}>~15x Better</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>Speed</TableCell>
                          <TableCell align="center">5.337 sec</TableCell>
                          <TableCell align="center" sx={{ color: "green", fontWeight: "bold" }}>3.920 sec</TableCell>
                          <TableCell align="center" sx={{ color: "green", fontWeight: "bold" }}>-1.417 sec (26.6%)</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "info.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Scan Type Comparison
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Without Optimization:</strong> Full Table Scan - examines every single row to calculate the birth month
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>With Optimization:</strong> Index Range Scan - uses the index on birth_month to locate only matching rows
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Key Findings & Benefits
                  </Typography>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      ✓ Significant Performance Improvement
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Reduces logical reads by approximately 15x. While 1.4 seconds may seem small with current dataset size, the improvement scales dramatically as data grows to millions of rows.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      ✓ Business Reliability Through Automation
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Every customer added to the database automatically gets the birth month calculated. The database engine ensures 100% data accuracy without manual intervention.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      ✓ Simpler Application Code
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Application code can simply query the birth_month column directly instead of performing complex date calculations. This reduces code complexity and maintenance overhead.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      ✓ Convenience & Consistency
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Generated columns ensure consistent calculations across all queries and applications accessing the same table. No risk of calculation discrepancies.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Trade-offs & Considerations
                  </Typography>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "warning.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      ⚠ Increased Storage Usage
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Creating additional columns and indexes consumes more disk space. However, the performance gain typically outweighs this cost.
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3, p: 2, bgcolor: "warning.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      ⚠ Schema Rigidity
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Once defined, changing the generation expression requires schema alterations. This can be complex in production environments with continuous data flow.
                    </Typography>
                  </Box>

                  <Box sx={{ p: 2, bgcolor: "warning.light", borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      ⚠ Performance Trade-offs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      While queries become faster, INSERT and UPDATE operations might be slightly slower due to the computation of generated values. This is a worthwhile trade-off for read-heavy applications.
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
                    Research Team - Query Slaves
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      { name: "Anabelle Eveleen Tandra", email: "ae.tandra.2025@mitb.smu.edu.sg" },
                      { name: "Chong Jia Min Heidi", email: "heidi.chong.2025@mitb.smu.edu.sg" },
                      { name: "Jeremiah William Sebastian", email: "j.sebastian.2025@mitb.smu.edu.sg" },
                      { name: "Kelvin Andikko", email: "k.andikko.2025@mitb.smu.edu.sg" },
                      { name: "Zachary Artemus Kondas", email: "Za.kondas.2025@mitb.smu.edu.sg" },
                    ].map((member, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            {member.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {member.email}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                  <Typography variant="body2" sx={{ fontStyle: "italic", mt: 3, color: "text.secondary" }}>
                    Team Name: "Query Slaves" - Dedicated to optimizing database queries and performance
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ProjectDetailQuery;