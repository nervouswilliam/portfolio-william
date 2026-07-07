// api/projectsData.js
//
// AUTO-GENERATED from src/JSON/*.json — plain JS module, no JSON import
// assertions, no cross-directory imports. This lives inside api/ so
// Vercel's serverless function bundler always includes it.
//
// To update: re-run the generation step whenever your project JSON changes
// (see scripts/generate-portfolio-data.js if you added that build step).

export const ALL_PROJECTS = [
  {
    "id": "hdb",
    "meta": {
      "title": "Repricing the HDB Market",
      "subtitle": "A Statistical Reassessment of Value Drivers in Post-COVID Singapore",
      "tabs": [
        "Overview",
        "Methodology",
        "Key Findings",
        "Team"
      ]
    },
    "techStack": [
      {
        "key": "react",
        "label": "React"
      },
      {
        "key": "mui",
        "label": "Material UI"
      },
      {
        "key": "python",
        "label": "Python"
      },
      {
        "key": "postgresql",
        "label": "PostgreSQL"
      }
    ],
    "sidebar": [
      {
        "type": "techStack"
      },
      {
        "type": "infoList",
        "title": "Course Information",
        "items": [
          {
            "primary": "Course",
            "secondary": "IS630 - Statistical Thinking for Data Science"
          },
          {
            "primary": "Institution",
            "secondary": "Singapore Management University"
          },
          {
            "primary": "Term",
            "secondary": "January Term, AY 2025/26"
          },
          {
            "primary": "Focus Region",
            "secondary": "West Singapore"
          }
        ]
      },
      {
        "type": "statCard",
        "title": "Data Range",
        "chip": {
          "label": "2015-2024 (10 years)",
          "color": "primary"
        },
        "captions": [
          "Pre-COVID: 2015-2019",
          "Post-COVID: 2020-2024"
        ]
      }
    ],
    "tabsContent": [
      [
        {
          "type": "textCard",
          "title": "Project Overview",
          "paragraphs": [
            {
              "text": "This project conducted an in-depth statistical analysis to examine the causal relationships and impacts of various factors on HDB Resale Flat prices in Singapore's West region. The study analyzes transactions from 2015-2024, providing a comprehensive 10-year analysis comparing pre-COVID and post-COVID periods."
            },
            {
              "text": "Rather than focusing solely on prediction accuracy, this research emphasizes pure statistical reasoning in data to understand true value drivers in the HDB resale market.",
              "variant": "body2",
              "italic": true
            }
          ]
        },
        {
          "type": "listCard",
          "title": "Research Objectives",
          "items": [
            {
              "primary": "How has the influence of different factors on HDB resale flat prices changed before and after COVID-19?"
            },
            {
              "primary": "To what extent does the remaining lease affect the price per square meter (PSM) of HDB resale flats?"
            },
            {
              "primary": "How do income and macroeconomic factors influence HDB resale flat prices in the West region before & after COVID?"
            }
          ]
        },
        {
          "type": "listCard",
          "title": "Data Sources",
          "description": "All datasets were obtained from Singapore Government's official open-data portals:",
          "items": [
            {
              "primary": "HDB Resale Flat Transactions (Jan 2015 – Jan 2026)",
              "secondary": "from HDB (data.gov.sg)"
            },
            {
              "primary": "MRT & Bus Station Data",
              "secondary": "from OneMap (onemap.gov.sg)"
            },
            {
              "primary": "Economic Indicators (Unemployment, GDP Growth, Interest Rates)",
              "secondary": "from SingStat and MAS"
            }
          ]
        }
      ],
      [
        {
          "type": "sectionsCard",
          "title": "Analytical Approaches",
          "sections": [
            {
              "heading": "Exploratory Data Analysis (EDA)",
              "body": "Initial data visualization and statistical summaries including box plots, heatmaps, and correlation analyses to identify patterns and relationships in the data."
            },
            {
              "heading": "Inferential Statistics",
              "body": "Hypothesis testing using ANOVA, Mann-Whitney U tests, and Kruskal-Wallis tests to validate observed trends and determine statistical significance."
            },
            {
              "heading": "Regression Modelling",
              "body": "Multi-linear regression and OLS regression models to quantify the independent contribution of each variable to resale prices, controlling for housing characteristics and location effects."
            }
          ]
        },
        {
          "type": "gridCards",
          "title": "Statistical Tests Performed",
          "items": [
            {
              "title": "Spearman's Correlation",
              "caption": "To check for multicollinearity between variables"
            },
            {
              "title": "Two-way ANOVA",
              "caption": "To analyze impact of convenience and time factors"
            },
            {
              "title": "Tukey HSD Test",
              "caption": "To quantify differences between factor groups"
            },
            {
              "title": "Kruskal-Wallis Test",
              "caption": "For non-parametric distribution comparisons"
            },
            {
              "title": "Mann-Whitney U Test",
              "caption": "To compare pre and post-COVID periods"
            },
            {
              "title": "OLS Regression",
              "caption": "To quantify macroeconomic variable contributions"
            }
          ]
        }
      ],
      [
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "Post-COVID Market Shift",
              "color": "info",
              "content": [
                {
                  "type": "paragraph",
                  "text": "The HDB market experienced a structural price increase after 2020, with prices rising from $250K-$400K pre-COVID to over $500K post-COVID. This represents a $183.9K mean increase in sale prices."
                }
              ]
            },
            {
              "title": "Convenience Premium",
              "color": "success",
              "content": [
                {
                  "type": "paragraph",
                  "text": "High convenience locations (scores 80-100) command a $33.9K premium over medium convenience areas. Post-COVID, buyers are willing to pay exponentially more for accessibility and proximity to transit."
                }
              ]
            },
            {
              "title": "Floor Level Importance",
              "color": "warning",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Floor level has emerged as a critical post-COVID driver, with clear premiums for units above the 25th floor. Room type remains the primary factor but is no longer the sole determinant."
                }
              ]
            },
            {
              "title": "Declining Affordability",
              "color": "error",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Price-to-Income Ratio (PIR) shows severe deterioration post-COVID, indicating worsening affordability. Pre-COVID saw gradual decline in PIR (improving affordability), but 2020 onwards shows sharp spikes indicating structural affordability crisis."
                }
              ]
            },
            {
              "title": "Remaining Lease Impact",
              "color": "info",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Non-linear positive association between remaining lease and PSM. Price drops sharply for leases under 70 years, then stabilizes. Post-COVID, buyers are increasingly purchasing older flats, possibly due to affordability constraints."
                }
              ]
            },
            {
              "title": "Income as Key Driver",
              "color": "success",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Household income is the strongest macroeconomic driver. A S$1,000 increase in median household income is associated with ~6.7% increase in resale prices, reflecting purchasing power effects."
                }
              ]
            },
            {
              "title": "Location Remains Critical",
              "color": "info",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Clementi consistently commands the highest prices due to proximity to universities and amenities. Post-COVID, Bukit Batok has also risen significantly. Location remains a key determinant of resale value."
                }
              ]
            }
          ]
        }
      ],
      [
        {
          "type": "teamGrid",
          "title": "Research Team",
          "members": [
            {
              "name": "Kelvin Andikko",
              "subtitle": "Matric: 01533318"
            },
            {
              "name": "Jeremiah William Sebestian",
              "subtitle": "Matric: 01549441"
            },
            {
              "name": "Heidi Chong Jia Min",
              "subtitle": "Matric: 01464078"
            },
            {
              "name": "Lim Eng Soon",
              "subtitle": "Matric: 01550636"
            },
            {
              "name": "Atharva Dipak Bhavsar",
              "subtitle": "Matric: 01548558"
            },
            {
              "name": "Prajapati Parth Jignesh",
              "subtitle": "Matric: 01548275"
            },
            {
              "name": "Varun Kumar Konjeti",
              "subtitle": "Matric: 01550808"
            }
          ]
        }
      ]
    ]
  },
  {
    "id": "fraud_detection",
    "meta": {
      "title": "Study on Fraud Detection Prediction",
      "subtitle": "Classification-Based Predictive Modelling for UK Fashion Retail Digital Payments",
      "tabs": [
        "Overview",
        "Methodology",
        "Results & Analysis",
        "Team"
      ]
    },
    "techStack": [
      {
        "label": "KNIME Analytics"
      },
      {
        "label": "Logistic Regression"
      },
      {
        "label": "Decision Tree"
      },
      {
        "label": "Random Forest"
      }
    ],
    "sidebar": [
      {
        "type": "techStack"
      },
      {
        "type": "infoList",
        "title": "Course Information",
        "items": [
          {
            "primary": "Course",
            "secondary": "ISSS602 - Data Analytics Lab"
          },
          {
            "primary": "Institution",
            "secondary": "Singapore Management University"
          },
          {
            "primary": "Term",
            "secondary": "AY 2026-27 (January)"
          },
          {
            "primary": "Focus",
            "secondary": "UK Fashion Retail"
          }
        ]
      },
      {
        "type": "statCard",
        "title": "Dataset Stats",
        "chip": {
          "label": "1,000 Transactions",
          "color": "primary"
        },
        "captions": [
          "Fraud Rate: ~4.4%",
          "44 Fraud Cases / 956 Non-Fraud"
        ]
      }
    ],
    "tabsContent": [
      [
        {
          "type": "textCard",
          "title": "Project Overview",
          "paragraphs": [
            {
              "text": "This research conducts a classification-based predictive modelling framework to better help identify fraudulent transactions in the retail sector with the growth of digital payment systems. With outdated fraud detection systems failing to detect new and evolving fraud patterns, customer confidence is shaken, potentially hindering digital economy growth."
            },
            {
              "text": "This study provides retailers with the means and tools for better fraud management and prevention by comparing three classification models: Logistic Regression, Decision Tree, and Random Forest. The analysis employs KNIME Analytics Platform to develop and evaluate models on 1,000 transaction records from the UK fashion digital payments sector."
            }
          ]
        },
        {
          "type": "listCard",
          "title": "Research Objectives",
          "items": [
            {
              "primary": "Analyse transaction characteristics and behavioural indicators associated with fraudulent payments."
            },
            {
              "primary": "Develop predictive models that classify transactions as fraudulent or legitimate."
            },
            {
              "primary": "Compare the performance of different classification models."
            },
            {
              "primary": "Provide insights on how analytics can support fraud detection in online retail operations."
            }
          ]
        },
        {
          "type": "listCard",
          "title": "Dataset Details",
          "description": "The UK Fashion Digital Payments Fraud dataset contains 1,000 transaction-level records with the following characteristics:",
          "items": [
            {
              "primary": "Transaction characteristics",
              "secondary": "Amount, items count, discount %, payment type, channel"
            },
            {
              "primary": "Behavioural indicators",
              "secondary": "Failed login attempts, device changes, transaction velocity"
            },
            {
              "primary": "Risk indicators",
              "secondary": "IP risk score, billing/shipping distance, address indicators, returns, chargebacks"
            },
            {
              "primary": "Final Variables",
              "secondary": "36 variables (24 original + 12 derived/engineered)"
            }
          ]
        }
      ],
      [
        {
          "type": "sectionsCard",
          "title": "Data Preparation",
          "sections": [
            {
              "heading": "Data Transformation",
              "body": "The is_fraud variable was converted from integer to string format for compatibility with machine learning learners. Categorical variables were transformed using one-to-many encoding, converting them into binary numerical format for model interpretation."
            },
            {
              "heading": "Feature Engineering",
              "body": "Four engineered features were created to provide explicit indicators for fraudulent behavior: behavior_risk_score, risk_intensity, avg_item_value, and velocity_ratio."
            },
            {
              "heading": "Multicollinearity Check",
              "body": "Correlation analysis was performed using a correlation matrix. Variables with correlation scores above 0.7 were excluded using column filter nodes to prevent variance inflation in coefficient estimates."
            },
            {
              "heading": "Data Balancing",
              "body": "SMOTE (Synthetic Minority Over-sampling Technique) was deployed to address dataset imbalance by generating synthetic records for the minority fraud class. Dataset split: 70% training, 30% testing."
            }
          ]
        },
        {
          "type": "gridCards",
          "title": "Classification Models",
          "items": [
            {
              "title": "Logistic Regression",
              "caption": "Binary classification with Stochastic Average Gradient optimization and Max Youden's Index for optimal threshold selection"
            },
            {
              "title": "Decision Tree",
              "caption": "Gini index quality measure with Minimum Description Length (MDL) to balance complexity and predictive power"
            },
            {
              "title": "Random Forest",
              "caption": "Ensemble learning with 250 decision trees using information gain as split criterion"
            },
            {
              "title": "Data Normalization",
              "caption": "Applied only to Logistic Regression (sensitive to data scale); not applied to tree-based models"
            }
          ]
        }
      ],
      [
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "Logistic Regression (Selected Model)",
              "color": "success",
              "content": [
                {
                  "type": "metrics",
                  "items": [
                    {
                      "label": "Recall",
                      "value": "92.3%",
                      "description": "Successfully identified 12 out of 13 fraudulent transactions, demonstrating strong capability in capturing anomalies."
                    },
                    {
                      "label": "Precision",
                      "value": "7.27%",
                      "description": "High false-positive rate, but trade-off is acceptable as it minimizes fraud leakage."
                    },
                    {
                      "label": "Accuracy",
                      "value": "48.5%",
                      "description": "with AUC: 0.723 - Selected as preferred model due to superior recall performance."
                    }
                  ]
                }
              ]
            },
            {
              "title": "Random Forest",
              "color": "info",
              "content": [
                {
                  "type": "metrics",
                  "items": [
                    {
                      "label": "Recall",
                      "value": "76.92%",
                      "description": "Correctly identified 10 out of 13 fraud cases, showing improved performance over Decision Tree."
                    },
                    {
                      "label": "Precision",
                      "value": "6.06%",
                      "description": "Still maintains high false positives."
                    },
                    {
                      "label": "Accuracy",
                      "value": "47.33%",
                      "description": "Reflects aggressive approach prioritizing fraud detection over overall accuracy."
                    }
                  ]
                }
              ]
            },
            {
              "title": "Decision Tree",
              "color": "warning",
              "content": [
                {
                  "type": "metrics",
                  "items": [
                    {
                      "label": "Recall",
                      "value": "61.54%",
                      "description": "Correctly identified 8 out of 13 fraud cases, with moderate fraud detection capability."
                    },
                    {
                      "label": "Precision",
                      "value": "5.67%",
                      "description": "133 non-fraud transactions misclassified as fraud."
                    },
                    {
                      "label": "Accuracy",
                      "value": "54.00%",
                      "description": "Moderate performance with limited effectiveness in balancing detection."
                    }
                  ]
                }
              ]
            },
            {
              "title": "Key Findings from EDA",
              "color": "info",
              "content": [
                {
                  "type": "bullets",
                  "items": [
                    {
                      "label": "Class Imbalance Challenge:",
                      "text": "Only 4.4% fraud rate (44 fraud vs 956 non-fraud) presents significant classification challenge."
                    },
                    {
                      "label": "Fraudster Patterns:",
                      "text": "Most fraud occurs in newer accounts (0-500 days) with lower transaction amounts (<100 GBP)."
                    },
                    {
                      "label": "Risk Indicators:",
                      "text": "Failed login attempts and higher risk intensity are key fraud indicators."
                    },
                    {
                      "label": "Multi-dimensional Anomalies:",
                      "text": "Fraudsters minimize detection by using overlapping patterns across email domain risk scores, channels, and account age."
                    }
                  ]
                }
              ]
            },
            {
              "title": "Model Selection Justification",
              "color": "error",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Logistic Regression was selected despite lower precision because missing fraudulent cases (false negatives) result in significant financial losses. The 92.3% recall ensures maximum fraud detection, while high false positives can be managed through manual verification by human agents before action is taken on suspicious transactions."
                }
              ]
            }
          ]
        }
      ],
      [
        {
          "type": "teamGrid",
          "title": "Research Team",
          "members": [
            {
              "name": "Chan Guang Hua",
              "subtitle": "SMU"
            },
            {
              "name": "Chong Jia Min Heidi",
              "subtitle": "SMU"
            },
            {
              "name": "Jeremiah William Sebastian",
              "subtitle": "SMU"
            }
          ]
        }
      ]
    ]
  },
  {
    "id": "query_optimization",
    "meta": {
      "title": "Query Processing and Optimization",
      "subtitle": "Making Generated Columns for SARGABLE Query Optimization",
      "tabs": [
        "Overview",
        "Problem & Solution",
        "Results & Comparison",
        "Team"
      ]
    },
    "techStack": [
      {
        "label": "MySQL"
      },
      {
        "label": "Generated Columns"
      },
      {
        "label": "Query Optimization"
      },
      {
        "label": "SARGABLE Predicates"
      }
    ],
    "sidebar": [
      {
        "type": "techStack"
      },
      {
        "type": "infoList",
        "title": "Course Information",
        "items": [
          {
            "primary": "Course",
            "secondary": "ISSS625 - Query Processing and Optimisation"
          },
          {
            "primary": "Institution",
            "secondary": "Singapore Management University"
          },
          {
            "primary": "Focus",
            "secondary": "Database Performance Optimization"
          }
        ]
      },
      {
        "type": "chipStack",
        "title": "Project Highlights",
        "chips": [
          {
            "label": "15x Fewer Logical Reads",
            "color": "success"
          },
          {
            "label": "1.4 Seconds Faster",
            "color": "success"
          },
          {
            "label": "O(log n) Complexity",
            "color": "primary"
          }
        ]
      }
    ],
    "tabsContent": [
      [
        {
          "type": "textCard",
          "title": "Project Overview",
          "paragraphs": [
            {
              "text": "This project demonstrates query optimization techniques using generated columns in MySQL to create SARGABLE (Search ARGument ABLE) queries. The study uses a realistic scenario of a jewelry store conducting a birthday-month promotion campaign, showing how to efficiently identify customers born in a specific month."
            },
            {
              "text": "By implementing generated columns and optimizing query predicates, we achieve significant performance improvements while maintaining data accuracy and consistency through automation. The project compares traditional unoptimized queries against SARGABLE optimized queries."
            }
          ]
        },
        {
          "type": "listCard",
          "title": "Business Scenario",
          "items": [
            {
              "primary": "Context",
              "secondary": "Jewelry store owner wants to run a birthday-month promotion campaign"
            },
            {
              "primary": "Challenge",
              "secondary": "How to verify customer information and identify customers born in a specific month"
            },
            {
              "primary": "Goal",
              "secondary": "Send targeted promotional offers to customers with birthdays in the selected month"
            },
            {
              "primary": "Solution",
              "secondary": "Implement generated columns for efficient query processing"
            }
          ]
        },
        {
          "type": "dataTable",
          "title": "Dataset Overview",
          "description": "Synthetic customer dataset created for demonstration purposes, loaded into MySQL using bulk data loading.",
          "note": "Note: birth_month is a generated column extracted from date_of_birth for query optimization",
          "headers": [
            {
              "label": "Column Name"
            },
            {
              "label": "Data Type"
            },
            {
              "label": "Purpose"
            }
          ],
          "rows": [
            [
              "customer_id",
              "INT (PK)",
              "Unique customer ID"
            ],
            [
              "first_name",
              "VARCHAR(50)",
              "Customer's first name"
            ],
            [
              "last_name",
              "VARCHAR(50)",
              "Customer's last name"
            ],
            [
              "email",
              "VARCHAR(120)",
              "Contact information"
            ],
            [
              "date_of_birth",
              "DATE",
              "Original birthday field"
            ],
            [
              "birth_month",
              "TINYINT",
              "Generated from date_of_birth"
            ]
          ],
          "highlightRowIndexes": [
            5
          ]
        }
      ],
      [
        {
          "type": "sectionsCard",
          "title": "Understanding Generated Columns",
          "sections": [
            {
              "heading": "What Are Generated Columns?",
              "body": "Generated columns are calculated from other columns in the same row. They automatically compute values based on expressions applied to other columns, eliminating the need for manual calculations and reducing errors."
            },
            {
              "heading": "Two Types of Generated Columns",
              "definitions": [
                {
                  "term": "Virtual Columns:",
                  "description": "Computed when queried, not stored in the table. Saves storage space but requires computation on each query."
                },
                {
                  "term": "Stored Columns:",
                  "description": "Computed once and saved in the table. Uses more storage but improves query performance and enables indexing."
                }
              ]
            }
          ]
        },
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "Without Optimization (Query 1)",
              "color": "warning",
              "content": [
                {
                  "type": "keyValueList",
                  "items": [
                    {
                      "label": "Approach",
                      "value": "Extract birth month on-the-fly using MONTH() function on date_of_birth"
                    },
                    {
                      "label": "Complexity",
                      "value": "O(n) - Must scan ALL rows and compute MONTH() for each"
                    },
                    {
                      "label": "Cost",
                      "value": "208,580 (full table scan) | Speed: 5.337 seconds"
                    }
                  ]
                }
              ]
            },
            {
              "title": "With Optimization (Query 2)",
              "color": "success",
              "content": [
                {
                  "type": "keyValueList",
                  "items": [
                    {
                      "label": "Approach",
                      "value": "Use SARGABLE generated column (birth_month) with indexed lookup"
                    },
                    {
                      "label": "Complexity",
                      "value": "O(log n + k) - Index lookup plus fetch matching rows"
                    },
                    {
                      "label": "Cost",
                      "value": "62,686 (index range scan) | Speed: 3.920 seconds"
                    }
                  ]
                }
              ]
            },
            {
              "title": "What Makes It SARGABLE?",
              "color": "info",
              "content": [
                {
                  "type": "paragraph",
                  "text": "SARGABLE (Search ARGument ABLE) predicates enable the query optimizer to use indexes efficiently. By moving the calculation into a generated column and indexing it, the database can use index range scans instead of full table scans."
                }
              ]
            }
          ]
        }
      ],
      [
        {
          "type": "dataTable",
          "title": "Performance Comparison",
          "headers": [
            {
              "label": "Metric"
            },
            {
              "label": "Without Optimization",
              "align": "center"
            },
            {
              "label": "With Generated Column",
              "align": "center"
            },
            {
              "label": "Improvement",
              "align": "center"
            }
          ],
          "rows": [
            [
              "Complexity",
              "O(n)",
              "O(log n + k)",
              "Polynomial"
            ],
            [
              "Cost",
              "208,580",
              "62,686",
              "~15x Better"
            ],
            [
              "Speed",
              "5.337 sec",
              "3.920 sec",
              "-1.417 sec (26.6%)"
            ]
          ],
          "goodColumns": [
            2,
            3
          ],
          "stripe": true
        },
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "Scan Type Comparison",
              "color": "info",
              "content": [
                {
                  "type": "keyValueList",
                  "items": [
                    {
                      "label": "Without Optimization",
                      "value": "Full Table Scan - examines every single row to calculate the birth month"
                    },
                    {
                      "label": "With Optimization",
                      "value": "Index Range Scan - uses the index on birth_month to locate only matching rows"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "✓ Significant Performance Improvement",
              "color": "success",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Reduces logical reads by approximately 15x. While 1.4 seconds may seem small with current dataset size, the improvement scales dramatically as data grows to millions of rows."
                }
              ]
            },
            {
              "title": "✓ Business Reliability Through Automation",
              "color": "success",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Every customer added to the database automatically gets the birth month calculated. The database engine ensures 100% data accuracy without manual intervention."
                }
              ]
            },
            {
              "title": "✓ Simpler Application Code",
              "color": "success",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Application code can simply query the birth_month column directly instead of performing complex date calculations. This reduces code complexity and maintenance overhead."
                }
              ]
            },
            {
              "title": "✓ Convenience & Consistency",
              "color": "success",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Generated columns ensure consistent calculations across all queries and applications accessing the same table. No risk of calculation discrepancies."
                }
              ]
            }
          ]
        },
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "⚠ Increased Storage Usage",
              "color": "warning",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Creating additional columns and indexes consumes more disk space. However, the performance gain typically outweighs this cost."
                }
              ]
            },
            {
              "title": "⚠ Schema Rigidity",
              "color": "warning",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Once defined, changing the generation expression requires schema alterations. This can be complex in production environments with continuous data flow."
                }
              ]
            },
            {
              "title": "⚠ Performance Trade-offs",
              "color": "warning",
              "content": [
                {
                  "type": "paragraph",
                  "text": "While queries become faster, INSERT and UPDATE operations might be slightly slower due to the computation of generated values. This is a worthwhile trade-off for read-heavy applications."
                }
              ]
            }
          ]
        }
      ],
      [
        {
          "type": "teamGrid",
          "title": "Research Team - Query Slaves",
          "members": [
            {
              "name": "Anabelle Eveleen Tandra",
              "subtitle": "ae.tandra.2025@mitb.smu.edu.sg"
            },
            {
              "name": "Chong Jia Min Heidi",
              "subtitle": "heidi.chong.2025@mitb.smu.edu.sg"
            },
            {
              "name": "Jeremiah William Sebastian",
              "subtitle": "j.sebastian.2025@mitb.smu.edu.sg"
            },
            {
              "name": "Kelvin Andikko",
              "subtitle": "k.andikko.2025@mitb.smu.edu.sg"
            },
            {
              "name": "Zachary Artemus Kondas",
              "subtitle": "Za.kondas.2025@mitb.smu.edu.sg"
            }
          ],
          "footerNote": "Team Name: \"Query Slaves\" - Dedicated to optimizing database queries and performance"
        }
      ]
    ]
  },
  {
    "id": "ev_infrastructure",
    "meta": {
      "title": "Singapore's Infrastructure Readiness For EV",
      "subtitle": "Will Singapore's power grid and public charging infrastructure support a 100% EV future by 2035?",
      "tabs": [
        "Overview",
        "Modelling & Methodology",
        "Key Findings",
        "Team"
      ]
    },
    "techStack": [
      {
        "label": "Excel"
      },
      {
        "label": "Scenario Manager"
      },
      {
        "label": "Monte Carlo Simulation"
      },
      {
        "label": "Sensitivity Analysis"
      }
    ],
    "sidebar": [
      {
        "type": "techStack"
      },
      {
        "type": "infoList",
        "title": "Course Information",
        "items": [
          {
            "primary": "Course",
            "secondary": "IS602 - Spreadsheet Modelling for Decision Making"
          },
          {
            "primary": "Institution",
            "secondary": "Singapore Management University"
          },
          {
            "primary": "Group",
            "secondary": "G1 - Group 5"
          },
          {
            "primary": "Focus",
            "secondary": "EV Grid & Charging Infrastructure"
          }
        ]
      },
      {
        "type": "statCard",
        "title": "Study Scope",
        "chip": {
          "label": "2026 - 2035 Projection",
          "color": "primary"
        },
        "captions": [
          "Public charging only",
          "Excludes home/workplace charging"
        ]
      }
    ],
    "tabsContent": [
      [
        {
          "type": "textCard",
          "title": "Project Overview",
          "paragraphs": [
            {
              "text": "This study assesses whether Singapore's power grid and public charging infrastructure can support a complete transition to a full electric vehicle society by 2035. As of end-2024, electric cars account for approximately 7.5% of Singapore's total car population, up from under 2% just two years prior, with EVs representing about one-third of all new car registrations in 2024."
            },
            {
              "text": "Hypothesis: Singapore's power grid and public charging infrastructure will be sufficient to support a complete transition to a full electric vehicle society by 2035.",
              "italic": true
            },
            {
              "text": "The model uses BYD's Singapore model lineup (Atto 3, Seal, Dolphin, Sealion) as a representative sample to derive a defensible kWh/km electricity consumption figure, replacing generic industry assumptions with a brand-specific, publicly verifiable figure."
            }
          ]
        },
        {
          "type": "listCard",
          "title": "Research Questions",
          "items": [
            {
              "primary": "Will Singapore's electricity grid maintain sufficient reserve margin to absorb peak EV charging load by 2035?"
            },
            {
              "primary": "Is the projected national public charging infrastructure (60,000 charger target by 2030) adequate for the growing EV fleet?"
            },
            {
              "primary": "Is public charging resources equitably distributed across Singapore's 55 URA planning areas?"
            }
          ]
        },
        {
          "type": "listCard",
          "title": "Data Sources",
          "description": "Key datasets used to build and calibrate the model:",
          "items": [
            {
              "primary": "LTA - Motor Vehicle Population by Type & Fuel Type",
              "secondary": "EV adoption baseline; penetration rate (~7.5%)"
            },
            {
              "primary": "EMA Grid Capacity & Generation Data",
              "secondary": "Grid capacity headroom; sufficiency ratio"
            },
            {
              "primary": "MOT EV Roadmap / LTA EV Targets",
              "secondary": "60,000 charging points by 2030; 100% EV by 2040"
            },
            {
              "primary": "LTA EV Incentives (EEAI, VES)",
              "secondary": "Policy levers; trade-off analysis inputs"
            },
            {
              "primary": "HDB / URA - Carpark Locations",
              "secondary": "Spatial distribution modelling (Module 4)"
            },
            {
              "primary": "SingStat - Population Density",
              "secondary": "Demand distribution; spatial equity model"
            },
            {
              "primary": "BYD Singapore - Model Specifications",
              "secondary": "Battery capacity & range for Module 1 demand calc"
            }
          ]
        }
      ],
      [
        {
          "type": "sectionsCard",
          "title": "Model Architecture",
          "sections": [
            {
              "heading": "Overall Black Box Model",
              "body": "Variables are arranged into three layers: controllable inputs (government incentives, COE supply policy, charger deployment rate, TOU pricing, infra budget allocation), uncontrollable parameters (battery efficiency, EV price trends, average annual km, simultaneous charging rate, population density), and outputs (Grid Sufficiency Ratio, Grid Overload Risk Score, EV-to-Charger Ratio, Spatial Equity Score)."
            },
            {
              "heading": "Four Interdependent Modules",
              "body": "Module 1 (EV Adoption & Electricity Demand) is the sole point of dependency for all other modules - its outputs cascade into Module 2 (Peak Load Impact on Grid), Module 3 (Charging Infrastructure Sufficiency), and Module 4 (Spatial Distribution). Any change to adoption assumptions propagates through all four performance metrics."
            },
            {
              "heading": "Scenario Modelling",
              "body": "Three scenarios - Conservative, Base, and Accelerated - are controlled via Excel Scenario Manager on Module 1 parameters, using a logistic (S-curve) adoption function, and propagate automatically to all downstream modules and the Dashboard."
            }
          ]
        },
        {
          "type": "dataTable",
          "title": "Scenario Parameters",
          "headers": [
            {
              "label": "Scenario"
            },
            {
              "label": "L (Saturation Cap)",
              "align": "center"
            },
            {
              "label": "k (Growth Steepness)",
              "align": "center"
            },
            {
              "label": "t₀ (Inflection Year)",
              "align": "center"
            },
            {
              "label": "Interpretation"
            }
          ],
          "rows": [
            [
              "Conservative",
              "0.75",
              "0.35",
              "2032",
              "Slower policy pull-through; incentives partially effective; adoption peaks late in decade"
            ],
            [
              "Base",
              "0.90",
              "0.50",
              "2030",
              "Aligned with government targets; sustained EEAI incentives; steady charger rollout"
            ],
            [
              "Accelerated",
              "0.97",
              "0.70",
              "2028",
              "Strong policy push; high incentive uptake; early fleet saturation - maximum stress case"
            ]
          ]
        },
        {
          "type": "gridCards",
          "title": "Key Modelling Assumptions",
          "items": [
            {
              "title": "Total Car Fleet",
              "caption": "659,889 vehicles (fixed) - EVs replace retiring ICE as COE expires; fleet does not grow"
            },
            {
              "title": "Annual km / kWh per Vehicle",
              "caption": "17,000 km/yr × 0.2001 kWh/km = 3,402 kWh/yr (BYD WLTP 0.174 × 1.15 real-world uplift)"
            },
            {
              "title": "Peak Charging Window & Fraction",
              "caption": "7:00-11:00 pm weekdays; 60% of fleet charging simultaneously"
            },
            {
              "title": "Charger Mix & Weighted Power",
              "caption": "20% fast DC (50 kW) / 80% slow AC (7.4 kW) → 15.92 kW average"
            },
            {
              "title": "EMA Reserve Margin Threshold",
              "caption": "≥ 15% reserve margin = Risk Score ≤ 0.870"
            },
            {
              "title": "Study Scope",
              "caption": "Public charging only (HDB/URA carparks, petrol stations); private home/workplace charging excluded"
            }
          ]
        }
      ],
      [
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "Module 1: EV Adoption on Track",
              "color": "success",
              "content": [
                {
                  "type": "paragraph",
                  "text": "By 2035 there will be 512,874 EVs (77.7% fleet share), annual demand of 1,744.6 GWh, with a peak load of 4,899 MW. The EV energy share of 1.95% appears low but does not indicate grid safety during peak demand."
                }
              ]
            },
            {
              "title": "Module 2: Grid Reserve Margin Breached",
              "color": "error",
              "content": [
                {
                  "type": "paragraph",
                  "text": "EMA's 15% reserve margin will be breached in 2033, when it drops to 9.4%. By 2035, reserve margin will hit -6.2% and the Grid Overload Risk Score reaches 1.062 (≥1.000 indicates grid saturation), with peak demand of 16,746 MW against 15,761 MW capacity."
                }
              ]
            },
            {
              "title": "Module 3: National Charging Sufficient",
              "color": "success",
              "content": [
                {
                  "type": "paragraph",
                  "text": "The EV-to-Charger Ratio (threshold of 10) is never breached across the full 2026 to 2035 window across all scenarios, reaching only 5.818 by 2035. Singapore's public charging infrastructure will be sufficient to support a complete EV transition by 2035, based on the LTA target of 60,000 chargers by 2030 and 8% annual growth thereafter."
                }
              ]
            },
            {
              "title": "Module 4: Spatial Equity Uneven",
              "color": "warning",
              "content": [
                {
                  "type": "paragraph",
                  "text": "16 of the 55 planning areas exceeded the ECR threshold of 10 by 2035, with 5 more on a WATCH list. The worst-performing area is Sengkang, with an ECR of 27.64, highlighting a structural gap between national-level sufficiency and local-level access."
                }
              ]
            },
            {
              "title": "Trade-off Analysis: Incentive Design",
              "color": "info",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Infrastructure subsidies have no meaningful impact on EV adoption, whereas an EEAI rebate of $10,000 per EV maximizes adoption at the lowest fiscal cost per EV, with $0 infrastructure subsidy per charger recommended as the most cost-effective policy lever."
                }
              ]
            },
            {
              "title": "Trade-off Analysis: Cost vs. Equity",
              "color": "info",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Centralized Charging Hubs cover up to 1.45 EVs per $1,000 of government expenditure versus 0.32 EVs per $1,000 for fully Distributed Carpark Grants - a 353% improvement in cost efficiency - but centralization fails to achieve spatial equity, so the optimal mix depends on whether the government prioritizes cost efficiency or driver convenience."
                }
              ]
            },
            {
              "title": "Sensitivity Analysis: Grid is the Binding Constraint",
              "color": "error",
              "content": [
                {
                  "type": "paragraph",
                  "text": "15 out of 25 modelled scenarios show a risk score above the 1.00 threshold. The grid risk profile is significantly more sensitive to capacity variations than to peak demand fluctuations, confirming infrastructure expansion as the primary binding constraint for long-term viability."
                }
              ]
            }
          ]
        },
        {
          "type": "dataTable",
          "title": "Conclusion Summary",
          "headers": [
            {
              "label": "Dimension"
            },
            {
              "label": "2035 Result (Base | Accelerated)",
              "align": "center"
            },
            {
              "label": "Threshold",
              "align": "center"
            },
            {
              "label": "Verdict",
              "align": "center"
            }
          ],
          "rows": [
            [
              "EV Adoption",
              "512,874 EVs (77.7%) | 659,889 EVs (100%)",
              "—",
              "On track under all scenarios"
            ],
            [
              "Power Grid",
              "Reserve Margin: -6.2% (Base) | -15.2% (Accelerated)",
              "≥ 15% (EMA)",
              "INSUFFICIENT"
            ],
            [
              "National Charging",
              "ECR: 5.82 (Base) | 7.49 (Accelerated)",
              "≤ 10 EVs/charger",
              "SUFFICIENT"
            ],
            [
              "Spatial Equity",
              "16 of 55 areas breach ECR threshold; Sengkang ECR = 27.64",
              "≤ 10 per area",
              "UNEVEN"
            ]
          ]
        }
      ],
      [
        {
          "type": "teamGrid",
          "title": "Research Team",
          "members": [
            {
              "name": "Albert Chia Song Tuck",
              "subtitle": "albert.chia.2025@mitb.smu.edu.sg"
            },
            {
              "name": "Amanda Dea Gotama",
              "subtitle": "ad.gotama.2025@mitb.smu.edu.sg"
            },
            {
              "name": "Chua Wee Tian",
              "subtitle": "wt.chua.2025@mitb.smu.edu.sg"
            },
            {
              "name": "Jeremiah William Sebastian",
              "subtitle": "j.sebastian.2025@mitb.smu.edu.sg"
            },
            {
              "name": "Heidi Chong Jia Min",
              "subtitle": "heidi.chong.2025@mitb.smu.edu.sg"
            }
          ]
        }
      ]
    ]
  },
  {
    "id": "smm_social_networks",
    "meta": {
      "title": "Social Communities and Influence Patterns in Super Mario Maker Player Networks",
      "subtitle": "Using Network Science to Detect Player Communities, Identify Influencers, and Power Course Recommendations",
      "tabs": [
        "Overview",
        "Methodology",
        "Community Analysis",
        "Influence & Recommendations",
        "Team"
      ]
    },
    "techStack": [
      {
        "label": "Louvain Community Detection"
      },
      {
        "label": "Label Propagation"
      },
      {
        "label": "PageRank & Betweenness Centrality"
      },
      {
        "label": "Chi-square / Kruskal-Wallis Testing"
      }
    ],
    "sidebar": [
      {
        "type": "techStack"
      },
      {
        "type": "infoList",
        "title": "Course Information",
        "items": [
          {
            "primary": "Course",
            "secondary": "ISSS606 - Applied Data Science for Social Networks"
          },
          {
            "primary": "Institution",
            "secondary": "Singapore Management University"
          },
          {
            "primary": "Group",
            "secondary": "SuperKambros"
          },
          {
            "primary": "Dataset",
            "secondary": "SMMNet - Super Mario Maker Social Network"
          }
        ]
      },
      {
        "type": "statCard",
        "title": "Network Scale",
        "chip": {
          "label": "6,091 Players",
          "color": "primary"
        },
        "captions": [
          "285,796 weighted edges",
          "Louvain modularity: 0.3681",
          "4 core communities (≥100 players)"
        ]
      }
    ],
    "tabsContent": [
      [
        {
          "type": "listCard",
          "title": "Research Questions",
          "items": [
            {
              "primary": "Do players form meaningful communities based on their gaming behavior?"
            },
            {
              "primary": "Who are the core players, bridge players, and creators that shape the network structure?"
            },
            {
              "primary": "Can network structure be used to support course recommendation and player discovery?"
            }
          ]
        },
        {
          "type": "listCard",
          "title": "Five Core Entities",
          "description": "The SMMNet dataset is modelled around five interacting entities:",
          "items": [
            {
              "primary": "Player",
              "secondary": "The individual user"
            },
            {
              "primary": "Courses",
              "secondary": "Player-created levels"
            },
            {
              "primary": "Play",
              "secondary": "Baseline interaction between a player and a course"
            },
            {
              "primary": "Likes",
              "secondary": "Weight 2 - strong positive engagement"
            },
            {
              "primary": "Clears",
              "secondary": "Weight 3 - maximum engagement"
            }
          ]
        },
        {
          "type": "sectionsCard",
          "title": "Constructing the Network",
          "sections": [
            {
              "heading": "Filtering Criteria",
              "body": "The bipartite player-course network is built using interactions with weight ≥ 3, restricted to the top 8,000 players and top 4,000 courses by activity."
            },
            {
              "heading": "Projection Threshold",
              "body": "The bipartite graph is projected into a single-mode player-player network, keeping only edges where two players share ≥ 2 courses in common."
            }
          ]
        },
        {
          "type": "listCard",
          "title": "Data Reduction and Filtering",
          "items": [
            {
              "primary": "Clean and standardized heterogeneous player_id and course ID across tables"
            },
            {
              "primary": "Sampling only active players and highly popular levels",
              "secondary": "To ensure computational feasibility and eliminate network noise"
            }
          ]
        }
      ],
      [
        {
          "type": "sectionsCard",
          "title": "Community Detection Approach",
          "sections": [
            {
              "heading": "Louvain vs Label Propagation",
              "body": "An extended robustness check was run on the weighted player projection, comparing the Louvain algorithm against Label Propagation (LPA)."
            }
          ]
        },
        {
          "type": "dataTable",
          "title": "Louvain vs Label Propagation Comparison",
          "headers": [
            {
              "label": "Metric"
            },
            {
              "label": "Louvain",
              "align": "center"
            },
            {
              "label": "Label Propagation",
              "align": "center"
            }
          ],
          "rows": [
            [
              "Modularity",
              "0.3686",
              "0.325"
            ],
            [
              "Runtime",
              "~6.0 seconds",
              "~2.3 seconds"
            ]
          ],
          "goodColumns": [
            1
          ]
        },
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "Louvain",
              "color": "info",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Higher modularity (0.3686) and a more useful community-size profile."
                }
              ]
            },
            {
              "title": "Label Propagation",
              "color": "warning",
              "content": [
                {
                  "type": "paragraph",
                  "text": "About 2.5x faster, but outcomes vary more across random seeds."
                }
              ]
            },
            {
              "title": "Decision",
              "color": "success",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Use Louvain for the main community profiles; retain Label Propagation as the scalability benchmark."
                }
              ]
            }
          ]
        },
        {
          "type": "sectionsCard",
          "title": "Statistical Validation of Community Profiles",
          "sections": [
            {
              "heading": "Categorical Profile Validation",
              "body": "Chi-square tests check whether community membership is associated with categorical course preferences. Difficulty mix: Cramer's V = 0.323 (chi2 = 30,230.1, p<0.001). Game style mix: Cramer's V = 0.127 (chi2 = 4,671.5, p<0.001). Difficulty is the stronger categorical separator; game style is still significant but weaker."
            },
            {
              "heading": "Numerical Profile Validation",
              "body": "Kruskal-Wallis tests compare skewed numeric variables across the four core communities. Clear rate: Eta-squared(H) = 0.242 (H=23,381.7, p<0.001). Attempts: Eta-squared(H) = 0.181 (H=17,461.6, p<0.001). Stars received: Eta-squared(H) = 0.055 (H=5,315.8, p<0.001). All three numerical dimensions differ significantly; clear rate and attempts carry larger effects than stars."
            }
          ]
        }
      ],
      [
        {
          "type": "dataTable",
          "title": "Community Size and Density",
          "headers": [
            {
              "label": "Community"
            },
            {
              "label": "Players",
              "align": "center"
            },
            {
              "label": "Density",
              "align": "center"
            }
          ],
          "rows": [
            [
              "Casual Community",
              "2,753",
              "0.0138"
            ],
            [
              "Casual Community 2",
              "2,036",
              "0.0231"
            ],
            [
              "Hardcore Elite",
              "1,188",
              "0.1081"
            ],
            [
              "Beginner",
              "114",
              "0.4423"
            ]
          ],
          "note": "Smaller groups are much denser - density captures cohesion, not popularity."
        },
        {
          "type": "dataTable",
          "title": "Community Behavioral Profiles",
          "description": "Labels are assigned after Louvain detection using dominant difficulty, game style, clear rate, average attempts, and average stars received by their courses.",
          "headers": [
            {
              "label": "Community"
            },
            {
              "label": "Players",
              "align": "center"
            },
            {
              "label": "Difficulty"
            },
            {
              "label": "Game Style"
            },
            {
              "label": "Clear Rate",
              "align": "center"
            }
          ],
          "rows": [
            [
              "Casual Community",
              "2,753",
              "Normal",
              "Mario Bros U",
              "26.01%"
            ],
            [
              "Casual Community 2",
              "2,036",
              "Normal",
              "Mario Bros",
              "16.38%"
            ],
            [
              "Hardcore Elite",
              "1,188",
              "Super Expert",
              "Mario World",
              "9.04%"
            ],
            [
              "Beginner",
              "114",
              "Easy",
              "Mario Bros U",
              "51.98%"
            ]
          ]
        },
        {
          "type": "dataTable",
          "title": "Cross-Community Connection Strength",
          "description": "Rows show the source community; columns show where its connections go.",
          "headers": [
            {
              "label": "Source \\ Target"
            },
            {
              "label": "Casual Community",
              "align": "center"
            },
            {
              "label": "Casual Community 2",
              "align": "center"
            },
            {
              "label": "Hardcore Elite",
              "align": "center"
            },
            {
              "label": "Beginner",
              "align": "center"
            }
          ],
          "rows": [
            [
              "Casual Community",
              "45.66%",
              "33.91%",
              "18.72%",
              "1.71%"
            ],
            [
              "Casual Community 2",
              "29.86%",
              "36.75%",
              "32.56%",
              "0.82%"
            ],
            [
              "Hardcore Elite",
              "15.25%",
              "30.11%",
              "54.14%",
              "0.51%"
            ],
            [
              "Beginner",
              "29.76%",
              "16.23%",
              "10.85%",
              "43.17%"
            ]
          ]
        },
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "Strong Internal Cohesion",
              "color": "info",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Diagonal shares range from 36.75% to 54.14%, so community membership is behaviorally meaningful."
                }
              ]
            },
            {
              "title": "Casual Groups Overlap Most",
              "color": "info",
              "content": [
                {
                  "type": "paragraph",
                  "text": "The two casual communities exchange roughly 30% to 34% of their links."
                }
              ]
            },
            {
              "title": "Niche Boundary is Sharp",
              "color": "warning",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Hardcore-to-Beginner links account for only 0.51%, indicating limited direct mixing. This implies recommendations can preserve relevance while deliberately adding a small amount of cross-community discovery."
                }
              ]
            }
          ]
        }
      ],
      [
        {
          "type": "sectionsCard",
          "title": "Influence Roles: Who Shapes the Network",
          "sections": [
            {
              "heading": "Creators",
              "body": "Build new courses in Super Mario Maker and upload content to the entire social community."
            },
            {
              "heading": "Core Players",
              "body": "Play and master courses, set trends, and develop new strategies and playthroughs."
            },
            {
              "heading": "Bridge Players",
              "body": "Share content across communities and spread trends created by core players."
            },
            {
              "heading": "Normal Players",
              "body": "Consume content, follow set trends, and engage socially."
            }
          ]
        },
        {
          "type": "dataTable",
          "title": "Top Creator Players",
          "headers": [
            {
              "label": "Player ID"
            },
            {
              "label": "Community"
            },
            {
              "label": "Page Rank",
              "align": "center"
            },
            {
              "label": "Weighted Degree",
              "align": "center"
            },
            {
              "label": "Composite Score",
              "align": "center"
            }
          ],
          "rows": [
            [
              "Conducteur59220",
              "Casual Community",
              "0.010121",
              "13856",
              "0.986052"
            ],
            [
              "Plusbellelavie5",
              "Casual Community",
              "0.008448",
              "14461",
              "0.790773"
            ],
            [
              "Feuxdelamoule",
              "Casual Community",
              "0.006536",
              "11361",
              "0.632406"
            ],
            [
              "cowboye123",
              "Casual Community",
              "0.006339",
              "10775",
              "0.568169"
            ],
            [
              "indien1966",
              "Casual Community",
              "0.005392",
              "10419",
              "0.512084"
            ],
            [
              "tc.coeur",
              "Casual Community",
              "0.005178",
              "10269",
              "0.460973"
            ],
            [
              "quentintheret",
              "Casual Community",
              "0.004499",
              "8900",
              "0.412866"
            ],
            [
              "coeur2017",
              "Casual Community",
              "0.004316",
              "8128",
              "0.380629"
            ],
            [
              "sioux4",
              "Casual Community",
              "0.004421",
              "8770",
              "0.378535"
            ],
            [
              "Tchad7",
              "Casual Community",
              "0.003876",
              "8305",
              "0.356597"
            ]
          ]
        },
        {
          "type": "dataTable",
          "title": "Top Core Players",
          "headers": [
            {
              "label": "Player ID"
            },
            {
              "label": "Community"
            },
            {
              "label": "Page Rank",
              "align": "center"
            },
            {
              "label": "Weighted Degree",
              "align": "center"
            },
            {
              "label": "Core Gameplay Score",
              "align": "center"
            }
          ],
          "rows": [
            [
              "Thomasb35",
              "Hardcore Elite Community",
              "0.004185",
              "10126",
              "0.556103"
            ],
            [
              "billyspencer",
              "Casual Community",
              "0.003321",
              "7163",
              "0.410833"
            ],
            [
              "iLudovichiVanno",
              "Casual Community 2",
              "0.003020",
              "6593",
              "0.376258"
            ],
            [
              "CAPTAIN.LEVl",
              "Casual Community",
              "0.002628",
              "5312",
              "0.312545"
            ],
            [
              "kimnbud",
              "Casual Community",
              "0.002455",
              "5518",
              "0.311086"
            ],
            [
              "YvetteMack",
              "Casual Community",
              "0.002562",
              "5282",
              "0.308210"
            ],
            [
              "oosetsumo",
              "Casual Community",
              "0.002448",
              "5327",
              "0.304105"
            ],
            [
              "mogumoguerisan",
              "Casual Community 2",
              "0.002459",
              "5290",
              "0.303415"
            ],
            [
              "Myhtra2",
              "Casual Community",
              "0.002402",
              "5362",
              "0.303065"
            ],
            [
              "SpeedrunRobban",
              "Casual Community",
              "0.002348",
              "4794",
              "0.280751"
            ]
          ]
        },
        {
          "type": "dataTable",
          "title": "Top Bridge Players",
          "headers": [
            {
              "label": "Player ID"
            },
            {
              "label": "Community"
            },
            {
              "label": "Betweenness",
              "align": "center"
            },
            {
              "label": "Weighted Degree",
              "align": "center"
            },
            {
              "label": "Composite Score",
              "align": "center"
            }
          ],
          "rows": [
            [
              "Mario1UPkoopa",
              "Casual Community",
              "0.021614",
              "12246",
              "0.584810"
            ],
            [
              "shimidos32",
              "Casual Community 2",
              "0.013081",
              "3571",
              "0.211416"
            ],
            [
              "RURI333HRIRU777H",
              "Casual Community",
              "0.012885",
              "9713",
              "0.446103"
            ],
            [
              "pedritopin2015",
              "Casual Community",
              "0.012791",
              "8865",
              "0.413617"
            ],
            [
              "Timridge",
              "Casual Community 2",
              "0.012289",
              "4471",
              "0.249186"
            ],
            [
              "mario-tomoya",
              "Casual Community",
              "0.011921",
              "8340",
              "0.391808"
            ],
            [
              "Kodrak123",
              "Casual Community 2",
              "0.011832",
              "3290",
              "0.192161"
            ],
            [
              "NEWT82",
              "Casual Community",
              "0.010384",
              "4675",
              "0.241096"
            ],
            [
              "catmarioheidi",
              "Casual Community",
              "0.009421",
              "8283",
              "0.368829"
            ]
          ]
        },
        {
          "type": "dataTable",
          "title": "Bridge vs Core vs Normal Players",
          "headers": [
            {
              "label": "Player Type"
            },
            {
              "label": "Count",
              "align": "center"
            },
            {
              "label": "Avg Degree",
              "align": "center"
            },
            {
              "label": "Avg PageRank",
              "align": "center"
            },
            {
              "label": "Avg Betweenness",
              "align": "center"
            },
            {
              "label": "Avg Composite Score",
              "align": "center"
            }
          ],
          "rows": [
            [
              "Bridge Player",
              "9",
              "7050.4444",
              "0.0037",
              "0.0129",
              "0.3443"
            ],
            [
              "Core Player",
              "503",
              "1752.1213",
              "0.0007",
              "0.0012",
              "0.0693"
            ],
            [
              "Creator",
              "962",
              "483.5676",
              "0.0002",
              "0.0005",
              "0.0210"
            ],
            [
              "Normal Player",
              "4,614",
              "124.7939",
              "0.0001",
              "0.0001",
              "0.0049"
            ]
          ]
        },
        {
          "type": "sectionsCard",
          "title": "Multi-Role Overlaps",
          "sections": [
            {
              "heading": "Creators ∩ Bridge Players (n=11)",
              "body": "Basilika, Conducteur59220, Feuxdelamoule, GTRP_Easy, Plusbellelavie5, WIIMoustique, coeur2017, cowboye123, indien1966, quentintheret, tc.coeur."
            },
            {
              "heading": "Bridge Players ∩ Core Players (n=9)",
              "body": "Kodrak123, Mario1UPkoopa, NEWT82, RURI333HRIRU777H, Timridge, catmarioheidi, mario-tomoya, pedritopin2015, shimidos32."
            },
            {
              "heading": "Creators ∩ Core Players (n=0)",
              "body": "No players occupy both the Creator and Core Player roles simultaneously - these two influence types are structurally distinct."
            }
          ]
        },
        {
          "type": "sectionsCard",
          "title": "From Similarity to Recommendation",
          "sections": [
            {
              "heading": "Player Similarity from Shared Course Behavior",
              "body": "IDF weighting gives more credit to rare shared courses than globally popular ones. Most ties are weak (most player pairs share only a small amount of distinctive behavior), but a strong tail exists where a small set of pairs share many courses and receive high similarity weights. Strong neighbors become evidence for unseen courses, not automatic friends."
            },
            {
              "heading": "Recommendation as a Network Path",
              "body": "A recommendation is explained as: target player → similar players → unseen courses. The path is auditable - each recommended course can be traced back to the neighbors who supported it."
            },
            {
              "heading": "Scoring Formula",
              "body": "score(target, course) = sum(similarity x interaction weight x novelty). More support often helps, but strong neighbors and rare courses can outweigh raw count."
            }
          ]
        },
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "Similarity-Based Recommendations Win the Offline Comparison",
              "color": "success",
              "content": [
                {
                  "type": "keyValueList",
                  "items": [
                    {
                      "label": "Hit rate",
                      "value": "33.9% (similarity) vs 13.5% (community)"
                    },
                    {
                      "label": "Catalog coverage",
                      "value": "60.9% (similarity) vs 5.8% (community)"
                    },
                    {
                      "label": "Cross-community discovery",
                      "value": "21.2% (similarity) vs 3.5% (community)"
                    }
                  ]
                },
                {
                  "type": "paragraph",
                  "text": "Evaluated on 3,654 players for a Top-10 recommendation task. Similarity improves relevance while exposing a much broader and more diverse course catalog."
                }
              ]
            }
          ]
        },
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "Top-N Sampling Approach",
              "color": "warning",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Restricting the analysis to top players and courses may not fully represent the entire player base."
                }
              ]
            },
            {
              "title": "Network is Static",
              "color": "warning",
              "content": [
                {
                  "type": "paragraph",
                  "text": "The network represents a snapshot in time and does not capture how communities and influence evolve."
                }
              ]
            },
            {
              "title": "Offline Evaluation Only",
              "color": "warning",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Recommendation performance was assessed offline; results have not been validated through live A/B testing with real players."
                }
              ]
            }
          ]
        }
      ],
      [
        {
          "type": "teamGrid",
          "title": "Research Team - SuperKambros",
          "members": [
            {
              "name": "Jeremiah William Sebastian"
            },
            {
              "name": "Chong Jia Min Heidi"
            },
            {
              "name": "Lu Zhao Chen"
            },
            {
              "name": "Zachary Kondas"
            },
            {
              "name": "Zhai Tingting"
            },
            {
              "name": "Hu Yixuan"
            }
          ]
        },
        {
          "type": "listCard",
          "title": "References",
          "items": [
            {
              "primary": "Barabási, A.-L. (2016). Network Science. Cambridge University Press."
            },
            {
              "primary": "Blondel, V. D., Guillaume, J.-L., Lambiotte, R., & Lefebvre, E. (2008). Fast unfolding of communities in large networks. Journal of Statistical Mechanics: Theory and Experiment."
            },
            {
              "primary": "Moraes, L. M. P., & Cordeiro, R. L. F. (2019). SMMnet: A Social Network of Games Dataset. Brazilian Symposium on Databases, Dataset Showcase Workshop."
            },
            {
              "primary": "Moraes, L. M. P., & Cordeiro, R. L. F. (2025). Modeling and analyzing Social Networks of Games. Expert Systems with Applications."
            },
            {
              "primary": "SMMnet dataset repository",
              "secondary": "SMMnet - Super Mario Maker"
            }
          ]
        }
      ]
    ]
  },
  {
    "id": "customer_churn_ml",
    "meta": {
      "title": "Predicting Customer Churn Using Machine Learning Models",
      "subtitle": "Applying Supervised and Unsupervised Learning to Understand and Predict E-Commerce Customer Churn",
      "tabs": [
        "Overview",
        "Methodology",
        "Model Results",
        "Insights & Recommendations",
        "Team"
      ]
    },
    "techStack": [
      {
        "key": "python",
        "label": "Python"
      },
      {
        "label": "Logistic Regression"
      },
      {
        "label": "Decision Tree"
      },
      {
        "label": "XGBoost"
      },
      {
        "label": "K-Means Clustering"
      },
      {
        "key": "scikit",
        "label": "Scikit-learn"
      }
    ],
    "sidebar": [
      {
        "type": "techStack"
      },
      {
        "type": "infoList",
        "title": "Course Information",
        "items": [
          {
            "primary": "Course",
            "secondary": "CS610 - Applied Machine Learning"
          },
          {
            "primary": "Institution",
            "secondary": "Singapore Management University"
          },
          {
            "primary": "Term",
            "secondary": "April Term, AY 2025/26"
          },
          {
            "primary": "Group",
            "secondary": "Group 19"
          }
        ]
      },
      {
        "type": "statCard",
        "title": "Dataset",
        "chip": {
          "label": "Ecommerce Customer Behaviour & Sales 2020-2026",
          "color": "primary"
        },
        "captions": [
          "25,000 order-level records",
          "7,663 unique customers",
          "Churn rate: 8.9%"
        ]
      }
    ],
    "tabsContent": [
      [
        {
          "type": "textCard",
          "title": "Background & Business Problem",
          "paragraphs": [
            {
              "text": "Customer churn is a critical challenge in e-commerce because customers can easily switch between platforms and disengage silently, without any explicit cancellation event as in subscription-based services. This makes churn difficult to detect early using traditional monitoring methods."
            },
            {
              "text": "The core business challenge is not only to predict whether a customer will churn, but to understand the behavioural patterns behind it - converting historical customer data into actionable retention insights rather than relying on broad, reactive campaigns that waste resources on low-risk customers."
            }
          ]
        },
        {
          "type": "listCard",
          "title": "Project Objectives",
          "items": [
            {
              "primary": "Formulate customer churn as a binary classification problem using historical customer, transaction, engagement, and behavioural data."
            },
            {
              "primary": "Compare multiple ML approaches for churn prediction and insight generation: Logistic Regression (baseline), Decision Tree (interpretability), XGBoost (predictive strength), and K-Means (segmentation)."
            },
            {
              "primary": "Identify key churn drivers relevant to e-commerce retention strategy, such as recency, frequency, spending, return rate, and engagement."
            },
            {
              "primary": "Translate model outputs into actionable business recommendations to support proactive retention."
            }
          ]
        },
        {
          "type": "listCard",
          "title": "Data Understanding",
          "description": "Dataset: Ecommerce Customer Behaviour & Sales 2020-2026 (Kaggle), containing four tables:",
          "items": [
            {
              "primary": "customers.csv",
              "secondary": "Used - demographic and account-level attributes; source for loyalty tier and tenure_days"
            },
            {
              "primary": "orders.csv",
              "secondary": "Used - core transactional table for order-level features and customer-level aggregates"
            },
            {
              "primary": "product_summary.csv",
              "secondary": "Excluded - product-level aggregates over the entire dataset would cause data leakage"
            },
            {
              "primary": "monthly_revenue.csv",
              "secondary": "Excluded - used only for exploratory analysis, not customer-level prediction"
            }
          ]
        },
        {
          "type": "dataTable",
          "title": "Dataset Summary",
          "headers": [
            {
              "label": "Item"
            },
            {
              "label": "Value"
            }
          ],
          "rows": [
            [
              "Final supervised dataset size",
              "25,000 order-level records"
            ],
            [
              "Customer-level K-Means dataset size",
              "7,663 unique customers"
            ],
            [
              "Target variable",
              "churned (1 = churn, 0 = not churn)"
            ],
            [
              "Churn distribution",
              "8.9% (main supervised dataset)"
            ],
            [
              "XGBoost dataset",
              "Repeat-customer subset, 53.94% churn (365-day inactivity threshold)"
            ],
            [
              "Prediction task",
              "Binary classification"
            ],
            [
              "Segmentation task",
              "Unsupervised customer clustering"
            ]
          ]
        }
      ],
      [
        {
          "type": "sectionsCard",
          "title": "Data Preprocessing & Feature Engineering",
          "sections": [
            {
              "heading": "Data Cleaning",
              "body": "Redundant columns were removed from the customers dataset, including total_orders and returns_made (consolidated into return_rate), year/month/day_of_week/quarter (retained as order_date), and subtotal_usd/total_amount_usd/discount_pct/tax_pct (redundant with unit_price_usd and quantity). order_status was dropped as it duplicated the returned boolean field."
            },
            {
              "heading": "Missing Value Treatment",
              "body": "customer_rating contained substantial missing data and was imputed using median values. No further imputation was needed elsewhere."
            },
            {
              "heading": "Encoding of Categorical Variables",
              "body": "Binary variables (e.g. gender) were mapped to 0/1. Ordinal variables with natural rank order (membership_tier: Free, Silver, Gold, Platinum) were ordinally encoded. Nominal variables (country, acquisition_channel, device_used, payment_method, category) were one-hot encoded, dropping the first category to avoid the dummy variable trap. product_name, due to high cardinality, was frequency-encoded instead."
            },
            {
              "heading": "Feature Engineering",
              "body": "Two features were engineered to capture behavioural signals: tenure_days (difference between a customer's registration date and the most recent registration date in the dataset) and return_rate (returns made divided by total orders)."
            }
          ]
        },
        {
          "type": "sectionsCard",
          "title": "Modelling Approach",
          "sections": [
            {
              "heading": "Logistic Regression (Baseline)",
              "body": "Trained on behavioural features spanning purchase behaviour, engagement, price sensitivity, satisfaction, and shopping diversity. Preprocessing included median imputation, StandardScaler standardisation, and an 80/20 stratified split. Configured with max_iter=3000, random_state=42; evaluated via accuracy, precision, recall, F1, ROC-AUC, PR-AUC, and confusion matrix."
            },
            {
              "heading": "Decision Tree",
              "body": "ID/date columns dropped as non-predictive. Regularised with max_depth=5, min_samples_split=20, min_samples_leaf=10 to prevent overfitting. A class_weight of {0: 1, 1: 5} was applied since false negatives (missed churners) are more costly to the business than false positives."
            },
            {
              "heading": "XGBoost",
              "body": "Features engineered at the customer level (total_orders, monetary_value, total_discount, total_shipping, total_items, avg_delivery_days, avg_product_popularity). Churn was defined via a 365-day inactivity threshold on a repeat-customer subset. Trained with 200 estimators, learning rate 0.02, max depth 4, and scale_pos_weight to counter class imbalance. Because it uses a different churn definition and customer subset, its metrics are not directly comparable to the other supervised models."
            },
            {
              "heading": "K-Means Clustering",
              "body": "Order-level data was aggregated to customer level (7,663 customers) using recency, frequency, monetary value, engagement, satisfaction, return behaviour, price sensitivity, and behavioural diversity. Skewed variables were log-transformed before standardisation. Multiple values of K were evaluated using Silhouette Score, Davies-Bouldin Index, and business interpretability (segment size and churn-rate spread); the churn label itself was not used during clustering."
            }
          ]
        },
        {
          "type": "dataTable",
          "title": "K-Means: Choosing K",
          "description": "K = 4 was selected as the practical compromise between statistical separation and business interpretability (segment size, churn-rate spread of 0.0449).",
          "headers": [
            {
              "label": "K"
            },
            {
              "label": "Silhouette Score",
              "align": "center"
            },
            {
              "label": "Davies-Bouldin Index",
              "align": "center"
            },
            {
              "label": "Churn Rate Spread",
              "align": "center"
            }
          ],
          "rows": [
            [
              "2",
              "0.1171",
              "2.740",
              "0.0026"
            ],
            [
              "3",
              "0.0862",
              "2.480",
              "0.0439"
            ],
            [
              "4",
              "0.0800",
              "2.441",
              "0.0449"
            ],
            [
              "5",
              "0.0744",
              "2.466",
              "0.0686"
            ],
            [
              "6",
              "0.0850",
              "2.471",
              "0.0455"
            ]
          ],
          "highlightRowIndexes": [
            2
          ]
        }
      ],
      [
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "Logistic Regression: High Accuracy, Poor Churn Detection",
              "color": "error",
              "content": [
                {
                  "type": "metrics",
                  "items": [
                    {
                      "label": "Accuracy",
                      "value": "91.12%",
                      "description": ""
                    },
                    {
                      "label": "Precision",
                      "value": "55.56%",
                      "description": ""
                    },
                    {
                      "label": "Recall",
                      "value": "1.12%",
                      "description": "only 5 of 445 churners correctly identified"
                    },
                    {
                      "label": "ROC-AUC",
                      "value": "0.660",
                      "description": ""
                    },
                    {
                      "label": "PR-AUC",
                      "value": "0.212",
                      "description": ""
                    }
                  ]
                },
                {
                  "type": "paragraph",
                  "text": "The model predicts 'Not Churn' for almost every customer. Its high accuracy is driven entirely by the majority class, and it is not effective for churn detection at the default threshold."
                }
              ]
            },
            {
              "title": "Decision Tree: Deliberate Recall-Precision Trade-off",
              "color": "success",
              "content": [
                {
                  "type": "metrics",
                  "items": [
                    {
                      "label": "Accuracy",
                      "value": "84.9%",
                      "description": ""
                    },
                    {
                      "label": "ROC-AUC",
                      "value": "0.7428",
                      "description": ""
                    },
                    {
                      "label": "PR-AUC",
                      "value": "0.3387",
                      "description": "~4x better than the 0.089 baseline"
                    }
                  ]
                },
                {
                  "type": "paragraph",
                  "text": "The confusion matrix shows 4,023 true negatives, 532 false positives, 224 false negatives, and 221 true positives. The higher false-positive rate is a deliberate trade-off from the 5x false-negative penalty - better to reach out to a loyal customer than miss a churner. The first split is on days_since_last_purchase at 183.5 days (Gini 0.441), the strongest signal in the tree."
                }
              ]
            },
            {
              "title": "XGBoost: Strong Discriminatory Power",
              "color": "success",
              "content": [
                {
                  "type": "metrics",
                  "items": [
                    {
                      "label": "ROC-AUC",
                      "value": "0.79",
                      "description": ""
                    },
                    {
                      "label": "Precision",
                      "value": "0.70",
                      "description": ""
                    },
                    {
                      "label": "Recall",
                      "value": "0.84",
                      "description": ""
                    },
                    {
                      "label": "F1-score",
                      "value": "0.76",
                      "description": ""
                    }
                  ]
                },
                {
                  "type": "paragraph",
                  "text": "Confusion matrix: TN=353, FP=252, FN=116, TP=593. The high recall makes this model effective for flagging actual churners for intervention, with a good balance between true positives and true negatives and comparatively few false negatives. Churn rate among repeat customers was found to be 53.94%."
                }
              ]
            }
          ]
        },
        {
          "type": "dataTable",
          "title": "K-Means Customer Segments (K = 4)",
          "headers": [
            {
              "label": "Cluster"
            },
            {
              "label": "Segment Name"
            },
            {
              "label": "Size",
              "align": "center"
            },
            {
              "label": "Share",
              "align": "center"
            },
            {
              "label": "Churn Rate",
              "align": "center"
            }
          ],
          "rows": [
            [
              "0",
              "High-Value Occasional Customers",
              "1,843",
              "24.05%",
              "7.00%"
            ],
            [
              "1",
              "High-Value Occasional Customers",
              "1,823",
              "23.79%",
              "8.56%"
            ],
            [
              "2",
              "Repeat Multi-Category Customers",
              "1,838",
              "23.99%",
              "8.54%"
            ],
            [
              "3",
              "Dormant At-Risk Customers",
              "2,159",
              "28.17%",
              "11.49%"
            ]
          ],
          "goodColumns": [],
          "highlightRowIndexes": [
            3
          ]
        },
        {
          "type": "sectionsCard",
          "title": "Segment Profiles",
          "sections": [
            {
              "heading": "Cluster 0 & 1 - High-Value Occasional Customers",
              "body": "Cluster 0 has the highest average total spend (~$3,542) and order value (~$145.50), order_count ~3.74, return_rate ~7.53%, newsletter subscription ~72.6%. Cluster 1 shows moderate spend (~$1,527), lower frequency (order_count ~1.43), order value ~$95.31, return_rate ~3.32%."
            },
            {
              "heading": "Cluster 2 - Repeat Multi-Category Customers",
              "body": "Combines relatively high order_count (~3.78) with lower average spend per customer (~$822.74) and order value (~$74.65); newsletter subscription is 0.0 for this segment."
            },
            {
              "heading": "Cluster 3 - Dormant At-Risk Customers",
              "body": "Highest population share and highest observed churn (~11.49%), lowest mean total spend (~$548.88), and low average review/rating signals. Membership tier prevalence shows many customers in higher tiers, but churn remains elevated - notably 12.17% in Tier 0 - indicating membership status alone does not mitigate churn for this segment."
            }
          ]
        }
      ],
      [
        {
          "type": "sectionsCard",
          "title": "Business Insights by Model",
          "sections": [
            {
              "heading": "Logistic Regression",
              "body": "Because the model fails to detect the large majority of churners, it does not currently yield reliable, actionable business insight on its own - its output is dominated by bias toward predicting 'Not Churn'."
            },
            {
              "heading": "K-Means",
              "body": "High-churn segments with non-trivial historical spend (clusters 0 and 1) represent the highest near-term revenue risk and should be prioritised for retention experiments. Cluster 3's high churn is not fully explained by membership tier, suggesting structural issues like reduced engagement or product-experience gaps. Cluster 2's high frequency but lower order value and high category diversity suggests cross-sell opportunity without heavy discounting. Return rates vary meaningfully across clusters (0.0753 for cluster 0 vs 0.0086 for cluster 3), implying different churn drivers across segments."
            },
            {
              "heading": "Decision Tree",
              "body": "Customer recency is the most powerful churn signal: customers inactive beyond 183.5 days are high-risk. Among active customers, low total spending and zero reviews given are secondary indicators of weak engagement. Low return rates, low average order values, and short tenures characterise customers who disengage early - churn risk arises from multiple distinct patterns across the customer lifecycle, not a single cause."
            },
            {
              "heading": "XGBoost",
              "body": "Over half of repeat customers (53.94%) are considered churned under the 365-day inactivity baseline - a significant revenue loss requiring urgent retention strategies. Sustained engagement over time is crucial to retention. Certain product categories (Beauty & Personal Care, Clothing & Apparel) show notable influence on churn prediction, suggesting engagement with these lines may signal loyalty or disengagement."
            }
          ]
        },
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "Final Business Recommendation",
              "color": "success",
              "content": [
                {
                  "type": "paragraph",
                  "text": "The combined model insights support a shift from reactive to proactive retention. The Decision Tree identifies 183.5 days (~6 months) of inactivity as the early-warning threshold. XGBoost flags customers representing $58K in monetary value who carry 81% of the churn risk - these should be prioritised for immediate intervention given their high revenue exposure."
                },
                {
                  "type": "paragraph",
                  "text": "Some customers show low spending but high return rates, pointing to a broken customer experience or mismatched expectations rather than a pricing problem - this calls for targeted service and product-fit interventions rather than discount-based offers. Personalised reactivation campaigns should address dissatisfaction while rewarding high-value loyal customers, strengthening long-term retention across at-risk segments."
                }
              ]
            }
          ]
        },
        {
          "type": "sectionsCard",
          "title": "Segment-Specific Recommendations (K-Means)",
          "sections": [
            {
              "heading": "High-Value Customers (Clusters 0 & 1)",
              "body": "Protective retention: account-level outreach, loyalty reinforcement, personalised premium offers, early access - validated experimentally before broad rollout."
            },
            {
              "heading": "Dormant At-Risk (Cluster 3)",
              "body": "Two-pronged approach: reactivation campaigns (time-limited incentives, personalised reminders) combined with diagnostics (surveys, quality checks, CX escalations) to identify root causes."
            },
            {
              "heading": "Repeat Multi-Category (Cluster 2)",
              "body": "Personalised cross-sell and bundling recommendations; test margin-protective offers (free shipping thresholds, bundles) rather than blanket discounts."
            },
            {
              "heading": "High-Return Segments",
              "body": "Product quality audits, clearer sizing/description information, and post-purchase customer service to reduce return-driven churn."
            }
          ]
        },
        {
          "type": "highlightBoxes",
          "items": [
            {
              "title": "Limitations",
              "color": "warning",
              "content": [
                {
                  "type": "bullets",
                  "items": [
                    {
                      "label": "Class imbalance:",
                      "text": "Churners form only ~8.9% of the dataset, driving Logistic Regression's near-total recall failure."
                    },
                    {
                      "label": "Linearity assumption:",
                      "text": "Logistic Regression assumes a linear log-odds relationship; tree-based models performing better suggests true relationships may be non-linear."
                    },
                    {
                      "label": "Static churn definition:",
                      "text": "Based on a fixed 365-day inactivity threshold, which may not capture all nuances of disengagement."
                    },
                    {
                      "label": "K-Means assumptions:",
                      "text": "Assumes roughly spherical, comparable-variance clusters using Euclidean distance; results depend on feature/preprocessing choices and represent a static snapshot, not a time-aware model."
                    },
                    {
                      "label": "Decision Tree trade-off:",
                      "text": "The 5x false-negative penalty produces a low 29.3% churn precision - many flagged customers will not actually churn, a deliberate but costly trade-off."
                    },
                    {
                      "label": "XGBoost complexity:",
                      "text": "Computationally heavy, requires careful hyperparameter tuning, and is sensitive to data noise/overfitting as a boosting method."
                    }
                  ]
                }
              ]
            },
            {
              "title": "Future Improvements",
              "color": "info",
              "content": [
                {
                  "type": "paragraph",
                  "text": "Refine the churn definition beyond static 365-day inactivity to capture more nuanced disengagement. Incorporate additional features such as customer service interactions and demographic data. Apply threshold tuning and cost-sensitive evaluation, and validate retention strategies through controlled experiments (A/B testing)."
                }
              ]
            }
          ]
        }
      ],
      [
        {
          "type": "teamGrid",
          "title": "Research Team - Group 19",
          "members": [
            {
              "name": "Kelvin Andikko",
              "subtitle": "Matric: 01533318"
            },
            {
              "name": "Jeremiah William Sebestian",
              "subtitle": "Matric: 01549441"
            },
            {
              "name": "Heidi Chong Jia Min",
              "subtitle": "Matric: 01464078"
            },
            {
              "name": "Anabelle Eveleen Tandra",
              "subtitle": "Matric: 01550636"
            },
            {
              "name": "Alif Raditya",
              "subtitle": "Matric: 01548968"
            }
          ]
        },
        {
          "type": "listCard",
          "title": "References",
          "items": [
            {
              "primary": "Matuszelański, K., & Kopczewska, K. (2022). Customer Churn in Retail E-Commerce Business: Spatial and Machine Learning Approach. Journal of Theoretical and Applied Electronic Commerce Research, 17(1), 165-198."
            },
            {
              "primary": "Manzoor, A., Qureshi, M. A., Kidney, E., & Longo, L. (2024). A Review on Machine Learning Methods for Customer Churn Prediction and Recommendations for Business Practitioners. IEEE Access, 12, 70434-70463."
            },
            {
              "primary": "Geiler, L., Affeldt, S., & Nadif, M. (2022). A survey on machine learning methods for churn prediction. International Journal of Data Science and Analytics, 14, 217-242."
            },
            {
              "primary": "Van den Poel, D., & Burez, J. (2009). A survey on machine learning methods for churn prediction. Expert Systems with Applications, 36(3), 4626-4636."
            },
            {
              "primary": "Höppner, S., Stripling, E., Baesens, B., vanden Broucke, S., & Verdonck, T. (2020). Profit driven decision trees for churn prediction. European Journal of Operational Research, 284(3), 920-933."
            },
            {
              "primary": "Chen, T., & Guestrin, C. (2016). XGBoost: A Scalable Tree Boosting System. Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining (pp. 785-794)."
            },
            {
              "primary": "Xiahou, X., & Harada, Y. (2022). B2C E-Commerce Customer Churn Prediction Based on K-Means and SVM. Journal of Theoretical and Applied Electronic Commerce Research, 17(2), 1-18."
            },
            {
              "primary": "Ascarza, E. (2018). Retention Futility: Targeting High-Risk Customers Might be Ineffective. Journal of Marketing Research, 55(1), 80-98."
            }
          ]
        }
      ]
    ]
  }
];