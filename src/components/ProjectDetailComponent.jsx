import React, { useState, Fragment } from "react";
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
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import { useTranslation } from "react-i18next";
import { getProjectData } from "../JSON/i18n/registry";

// ---------------------------------------------------------------------------
// Icon registry — add new icons here and reference them by key in the JSON
// (e.g. techStack: [{ "key": "react", "label": "React" }])
// ---------------------------------------------------------------------------
const ICONS = {
  react: SiReact,
  mui: SiMui,
  supabase: SiSupabase,
  node: SiNodedotjs,
  postgresql: SiPostgresql,
  python: SiPython,
};

// ---------------------------------------------------------------------------
// Sidebar block components
// ---------------------------------------------------------------------------
function TechStackCard({ items = [] }) {
  const { t } = useTranslation();
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          {t("projectDetail.techStack")}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {items.map((item, i) => {
            const Icon = item.key && ICONS[item.key];
            return (
              <Chip
                key={i}
                icon={Icon ? <Icon size={20} /> : undefined}
                label={item.label}
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
              />
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

function InfoListCard({ title, items = [] }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>
        <List dense>
          {items.map((item, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={item.primary}
                secondary={item.secondary}
                secondaryTypographyProps={{ variant: "caption" }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

function StatCard({ title, chip, captions = [] }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>
        {chip && (
          <Chip
            label={chip.label}
            color={chip.color || "primary"}
            variant="outlined"
            sx={{ mb: 1 }}
          />
        )}
        {captions.map((c, i) => (
          <Typography
            key={i}
            variant="caption"
            display="block"
            color="text.secondary"
          >
            {c}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}

function ChipStackCard({ title, chips = [] }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>
        {chips.map((c, i) => (
          <Chip
            key={i}
            label={c.label}
            color={c.color || "default"}
            variant="outlined"
            sx={{ mb: 1, width: "100%" }}
          />
        ))}
      </CardContent>
    </Card>
  );
}

const SIDEBAR_COMPONENTS = {
  techStack: TechStackCard,
  infoList: InfoListCard,
  statCard: StatCard,
  chipStack: ChipStackCard,
};

// ---------------------------------------------------------------------------
// Main content block components
// ---------------------------------------------------------------------------
function TextCard({ title, paragraphs = [] }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>
        {paragraphs.map((p, i) => (
          <Typography
            key={i}
            variant={p.variant || "body1"}
            paragraph
            color="text.secondary"
            sx={p.italic ? { fontStyle: "italic" } : undefined}
          >
            {p.text}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}

function ListCard({ title, description, items = [] }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" paragraph color="text.secondary">
            {description}
          </Typography>
        )}
        <List dense>
          {items.map((item, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={item.primary}
                secondary={item.secondary}
                primaryTypographyProps={{ variant: "body2" }}
                secondaryTypographyProps={{ variant: "caption" }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

function SectionsCard({ title, sections = [] }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>
        {sections.map((s, i) => (
          <Box key={i} sx={{ mb: i === sections.length - 1 ? 0 : 3 }}>
            {s.heading && (
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {s.heading}
              </Typography>
            )}
            {s.body && (
              <Typography variant="body2" color="text.secondary" paragraph>
                {s.body}
              </Typography>
            )}
            {s.definitions && (
              <List dense>
                {s.definitions.map((d, j) => (
                  <ListItem key={j}>
                    <Typography variant="body2" sx={{ fontWeight: "bold", mr: 1 }}>
                      {d.term}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {d.description}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

function GridCards({ title, items = [] }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>
        <Grid container spacing={2}>
          {items.map((item, i) => (
            <Grid item xs={12} sm={item.sm || 6} key={i}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.caption}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

function HighlightContent({ block }) {
  if (block.type === "paragraph") {
    return (
      <Typography variant="body2" color="text.secondary" paragraph>
        {block.text}
      </Typography>
    );
  }
  if (block.type === "metrics") {
    return (
      <Typography variant="body2" color="text.secondary">
        {block.items.map((m, i) => (
          <Fragment key={i}>
            <strong>
              {m.label}
              {m.value ? `: ${m.value}` : ""}
            </strong>
            {m.description ? ` - ${m.description}` : ""}
            {i < block.items.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </Typography>
    );
  }
  if (block.type === "keyValueList") {
    return (
      <>
        {block.items.map((kv, i) => (
          <Typography key={i} variant="body2" color="text.secondary" paragraph>
            <strong>{kv.label}:</strong> {kv.value}
          </Typography>
        ))}
      </>
    );
  }
  if (block.type === "bullets") {
    return (
      <Typography variant="body2" color="text.secondary" paragraph>
        {block.items.map((b, i) => (
          <Fragment key={i}>
            • <strong>{b.label}</strong> {b.text}
            <br />
          </Fragment>
        ))}
      </Typography>
    );
  }
  return null;
}

function HighlightBoxes({ items = [] }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        {items.map((box, i) => (
          <Box
            key={i}
            sx={{
              mb: i === items.length - 1 ? 0 : 3,
              p: 2,
              bgcolor: `${box.color || "info"}.light`,
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {box.title}
            </Typography>
            {(box.content || []).map((block, j) => (
              <HighlightContent block={block} key={j} />
            ))}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

function DataTable({
  title,
  description,
  note,
  headers = [],
  rows = [],
  highlightRowIndexes = [],
  goodColumns = [],
  stripe = false,
}) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        {title && (
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" paragraph color="text.secondary">
            {description}
          </Typography>
        )}
        <TableContainer sx={{ mb: note ? 2 : 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {headers.map((h, i) => (
                  <TableCell key={i} align={h.align || "left"} sx={{ fontWeight: "bold" }}>
                    {h.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, ri) => {
                const isHighlighted = highlightRowIndexes.includes(ri);
                const isStriped = stripe && ri % 2 === 1;
                return (
                  <TableRow
                    key={ri}
                    sx={{
                      backgroundColor: isHighlighted
                        ? "#e8f5e9"
                        : isStriped
                        ? "#f9f9f9"
                        : undefined,
                    }}
                  >
                    {row.map((cell, ci) => (
                      <TableCell
                        key={ci}
                        align={headers[ci]?.align || "left"}
                        sx={{
                          fontWeight:
                            isHighlighted || goodColumns.includes(ci) ? "bold" : undefined,
                          color: goodColumns.includes(ci) ? "green" : undefined,
                        }}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {note && (
          <Typography variant="caption" color="text.secondary">
            {note}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

function TeamGrid({ title, members = [], footerNote }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          {title}
        </Typography>
        <Grid container spacing={2}>
          {members.map((m, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {m.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {m.subtitle}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {footerNote && (
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", mt: 3, color: "text.secondary" }}
          >
            {footerNote}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

const BLOCK_COMPONENTS = {
  textCard: TextCard,
  listCard: ListCard,
  sectionsCard: SectionsCard,
  gridCards: GridCards,
  highlightBoxes: HighlightBoxes,
  dataTable: DataTable,
  teamGrid: TeamGrid,
};

// ---------------------------------------------------------------------------
// Main component — pass in a `data` object matching the JSON schema
// ---------------------------------------------------------------------------
const ProjectDetailComponent = ({ data, projectKey }) => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Prefer locale-aware content resolved from projectKey; fall back to a
  // directly-passed `data` prop (kept for backwards compatibility).
  const resolvedData = projectKey
    ? getProjectData(projectKey, i18n.resolvedLanguage) || data
    : data;

  if (!resolvedData) return null;

  const { meta, techStack = [], sidebar = [], tabsContent = [] } = resolvedData;
  const activeBlocks = tabsContent[activeTab] || [];
  const showSidebar = activeTab === 0 && sidebar.length > 0;

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
            position: "relative",
            zIndex: 10,
            color: "#fff",
            backgroundColor: "primary.main",
            "&:hover": { backgroundColor: "primary.dark" },
          }}
        >
          {t("projectDetail.backToProjects")}
        </Button>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            {meta.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {meta.subtitle}
          </Typography>
          {meta.date && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {meta.date}
            </Typography>
          )}
        </Box>

        {/* Navigation Tabs */}
        <Paper sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
            {meta.tabs.map((label, i) => (
              <Tab label={label} key={i} />
            ))}
          </Tabs>
        </Paper>

        {/* Tab Content */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={showSidebar ? 8 : 12}>
            {activeBlocks.map((block, i) => {
              const Component = BLOCK_COMPONENTS[block.type];
              if (!Component) return null;
              return <Component key={i} {...block} />;
            })}
          </Grid>

          {showSidebar && (
            <Grid item xs={12} md={4}>
              {sidebar.map((block, i) => {
                const Component = SIDEBAR_COMPONENTS[block.type];
                if (!Component) return null;
                const props = block.type === "techStack" ? { items: techStack } : block;
                return <Component key={i} {...props} />;
              })}
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectDetailComponent;
