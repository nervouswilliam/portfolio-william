// import React from "react";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
//   Box,
//   Tooltip,
// } from "@mui/material";

// import {
//   SiReact,
//   SiMui,
//   SiSupabase,
//   SiNodedotjs,
//   SiPostgresql,
//   SiAndroid,
//   SiSqlite,
// } from "react-icons/si";
// import { DiJava } from "react-icons/di";

// import wisely from "/projects/wisely.png";
// import dev4you from "/projects/Dev4You.png";
// import cs2skin from "/projects/CesTwoSkin.png";
// import needworkapp from "/projects/needworkapp.png"
// import tictactoe from "/projects/tictactoe.png"

// export default function ProjectGrid() {
//   const techIcons = {
//     react: { icon: <SiReact size={22} />, label: "React" },
//     mui: { icon: <SiMui size={22} />, label: "Material UI" },
//     supabase: { icon: <SiSupabase size={22} />, label: "Supabase" },
//     nodejs: { icon: <SiNodedotjs size={22} />, label: "Node.js" },
//     postgres: { icon: <SiPostgresql size={22} />, label: "PostgreSQL" },
//     android: { icon: <SiAndroid size={22} />, label: "Android" },
//     java: { icon: <DiJava size={24} />, label: "Java" },
//     sqlite: { icon: <SiSqlite size={22} />, label: "SQLite" },
//   };

//   const projects = [
//     {
//       title: "Wisely",
//       description:
//         "A warehouse and sales tracking app that helps small businesses manage products, track expiration dates, and optimize restocks.",
//       image: wisely,
//       liveLink: "https://www.wisely.id",
//       github: "https://github.com/nervouswilliam/WISE/tree/master/frontend",
//       tech: ["react", "mui", "supabase"],
//     },
//     {
//       title: "Dev4You",
//       description:
//         "A platform connecting nonprofits with developers to build websites and apps at minimal cost while helping developers gain real-world experience.",
//       image: dev4you,
//       github: "https://github.com/nervouswilliam/skripsi",
//       tech: ["react", "mui", "nodejs", "postgres"],
//     },
//     {
//       title: "Need Work",
//       description:
//         "A search engine platform that helps people search for jobs from different job sites and allowing the to apply effortlessly.",
//       image: needworkapp,
//       liveLink:"https://www.needworkapp.com",
//       github: "https://github.com/nervouswilliam/needworkapp.com",
//       tech: ["react", "mui"],
//     },
//     {
//       title: "CesTwoSkin",
//       description:
//         "A mobile application that enables gamers to buy, sell, and trade Counter-Strike 2 weapon skins securely and effortlessly.",
//       image: cs2skin,
//       github: "https://github.com/nervouswilliam/cestwo_skin",
//       tech: ["android", "java", "sqlite"],
//     },
//     {
//       title: "Tic Tac Shift",
//       description:
//         "A web Application version of Tic Tac Toe with a twist, featuring a shifting board mechanic to enhance gameplay and strategy.",
//       image: tictactoe,
//       liveLink: "https://www.tictacshift.com",
//       github: "https://github.com/nervouswilliam/TicTacToe",
//       tech: ["react"],
//     },
//   ];

//   return (
//     <Box>
//       <Typography
//         variant="h4"
//         sx={{ textAlign: "center", mb: 5, fontWeight: "bold" }}
//       >
//         Projects
//       </Typography>

//       <Grid container spacing={4} justifyContent="center">
//         {projects.map((project, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card
//               sx={{
//                 maxWidth: 400,
//                 mx: "auto",
//                 borderRadius: 3,
//                 boxShadow: 4,
//                 transition: "transform 0.3s ease",
//                 "&:hover": { transform: "translateY(-6px)" },
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={project.image}
//                 alt={project.title}
//               />

//               <CardContent>
//                 <Typography
//                   gutterBottom
//                   variant="h6"
//                   sx={{ fontWeight: "bold" }}
//                 >
//                   {project.title}
//                 </Typography>

//                 <Typography variant="body2" color="text.secondary">
//                   {project.description}
//                 </Typography>

//                 {/* Tech Icons Row */}
//                 <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
//                   {project.tech.map((tech, i) => (
//                     <Tooltip key={i} title={techIcons[tech].label} arrow>
//                       <Box
//                         sx={{
//                           color: "grey", // Icon color
//                           "&:hover": { color: "#64ffda", cursor: "pointer" }, // Optional hover effect
//                           transition: "0.2s ease",
//                         }}
//                       >
//                         {techIcons[tech].icon}
//                       </Box>
//                     </Tooltip>
//                   ))}
//                 </Box>
//               </CardContent>

//               <CardActions>
//                 {project.liveLink && (
//                   <Button
//                     size="small"
//                     href={project.liveLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Live Demo
//                   </Button>
//                 )}

//                 <Button
//                   size="small"
//                   href={project.github}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   GitHub
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Tooltip,
  IconButton,
  ButtonBase,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

import {
  SiReact,
  SiMui,
  SiSupabase,
  SiNodedotjs,
  SiPostgresql,
  SiAndroid,
  SiSqlite,
  SiPython,
  SiPandas,
  SiPlotly,
  SiKnime,
  SiMysql,
  SiScikitlearn,
  SiN8N,
  SiOpenai
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { RiFileExcel2Fill } from "react-icons/ri";



import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedItems } from "../content/useContent";
import { LEGACY_PROJECT_IDS } from "../content/static";

const PINNED_STORAGE_KEY = "portfolio_pinned_projects";

function SortSwitch({ value, onChange, options, ariaLabel }) {
  const containerRef = useRef(null);
  const buttonRefs = useRef([]);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });
  const [animate, setAnimate] = useState(false);
  const index = Math.max(0, options.findIndex((o) => o.value === value));
  const labelsKey = options.map((o) => o.label).join("|");

  const measure = useCallback(() => {
    const el = buttonRefs.current[index];
    if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth });
  }, [index]);

  useLayoutEffect(() => {
    measure();
    const frame = requestAnimationFrame(() => setAnimate(true));
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [measure, labelsKey]);

  const onKeyDown = (e, i) => {
    const last = options.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    onChange(options[next].value);
    buttonRefs.current[next]?.focus();
  };

  return (
    <Box
      ref={containerRef}
      role="radiogroup"
      aria-label={ariaLabel}
      sx={{
        position: "relative",
        display: "inline-flex",
        maxWidth: "100%",
        p: "4px",
        borderRadius: 999,
        bgcolor: "rgba(10, 25, 47, 0.06)",
        border: "1px solid rgba(10, 25, 47, 0.08)",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: thumb.left,
          width: thumb.width,
          borderRadius: 999,
          bgcolor: "#0a192f",
          boxShadow: "0 4px 14px rgba(10, 25, 47, 0.28)",
          transition: animate
            ? "left 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "none",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      />
      {options.map((option, i) => {
        const selected = option.value === value;
        const Icon = option.icon;
        return (
          <ButtonBase
            key={option.value}
            ref={(el) => (buttonRefs.current[i] = el)}
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            sx={{
              position: "relative",
              zIndex: 1,
              gap: 0.75,
              px: { xs: 1.5, sm: 2.25 },
              py: 0.9,
              borderRadius: 999,
              fontFamily: "inherit",
              fontSize: { xs: 13, sm: 14 },
              fontWeight: 600,
              whiteSpace: "nowrap",
              color: selected ? "#64ffda" : "text.secondary",
              transition: "color 200ms ease",
              "&:hover": { color: selected ? "#64ffda" : "text.primary" },
              "&.Mui-focusVisible": { outline: "2px solid #64ffda", outlineOffset: 2 },
            }}
          >
            <Icon sx={{ fontSize: 18 }} />
            {option.label}
            {option.count > 0 && (
              <Box
                component="span"
                sx={{
                  minWidth: 18,
                  height: 18,
                  px: 0.5,
                  borderRadius: 9,
                  fontSize: 11,
                  fontWeight: 700,
                  lineHeight: "18px",
                  textAlign: "center",
                  bgcolor: selected ? "#64ffda" : "rgba(10, 25, 47, 0.12)",
                  color: selected ? "#0a192f" : "text.secondary",
                  transition: "background-color 200ms ease, color 200ms ease",
                }}
              >
                {option.count}
              </Box>
            )}
          </ButtonBase>
        );
      })}
    </Box>
  );
}

function loadPinned() {
  try {
    const raw = localStorage.getItem(PINNED_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map((id) => LEGACY_PROJECT_IDS[id] ?? id) : [];
  } catch {
    return [];
  }
}

export default function ProjectGrid() {
  const { t, i18n } = useTranslation();
  const [sortBy, setSortBy] = useState("date");
  const [pinnedIds, setPinnedIds] = useState(loadPinned);

  const togglePin = (id) => {
    setPinnedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      try {
        localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable (private mode etc.) — pin still works for this session
      }
      return next;
    });
  };

  const techIcons = {
    react: { icon: <SiReact size={22} />, label: "React" },
    mui: { icon: <SiMui size={22} />, label: "Material UI" },
    supabase: { icon: <SiSupabase size={22} />, label: "Supabase" },
    nodejs: { icon: <SiNodedotjs size={22} />, label: "Node.js" },
    postgres: { icon: <SiPostgresql size={22} />, label: "PostgreSQL" },
    android: { icon: <SiAndroid size={22} />, label: "Android" },
    java: { icon: <DiJava size={24} />, label: "Java" },
    sqlite: { icon: <SiSqlite size={22} />, label: "SQLite" },
    python: { icon: <SiPython size={22} />, label: "Python" },
    pandas: { icon: <SiPandas size={22} />, label: "Pandas" },
    matplotlib: { icon: <SiPlotly size={22} />, label: "Matplotlib" },
    knime: { icon: <SiKnime size={22} />, label: "knime" },
    mysql: { icon: <SiMysql size={22} />, label: "MySQL" },
    excel: { icon: <RiFileExcel2Fill size={22} />, label: "Excel" },
    scikit: { icon: <SiScikitlearn size={22} />, label: "Scikit-learn" },
    n8n: { icon: <SiN8N size={22} />, label: "n8n" },
    openai: { icon: <SiOpenai size={22} />, label: "OpenAI" },
  };

  const { items } = useLocalizedItems("project");
  const projects = items.map((it) => {
    const f = it.fields;
    return {
      id: it.slug,
      title: f.title,
      description: f.description,
      date: f.date,
      image: f.image,
      liveLink: f.liveLink,
      github: f.github,
      tech: (f.tech || []).filter((k) => techIcons[k]),
      details: f.route ? `/${f.route}` : f.detail ? `/projects/${it.slug}` : null,
    };
  });

  const byDateDesc = (a, b) => Number(b.date) - Number(a.date);
  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title, i18n.language);
    }
    if (sortBy === "pinned") {
      const pinDiff = pinnedIds.includes(b.id) - pinnedIds.includes(a.id);
      return pinDiff || byDateDesc(a, b);
    }
    return byDateDesc(a, b);
  });

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
      >
        {t("projects.heading")}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <SortSwitch
          value={sortBy}
          onChange={setSortBy}
          ariaLabel={t("projects.sortLabel")}
          options={[
            { value: "date", label: t("projects.sortDate"), icon: AccessTimeIcon },
            { value: "alphabetical", label: t("projects.sortAlphabetical"), icon: SortByAlphaIcon },
            { value: "pinned", label: t("projects.sortPinned"), icon: StarBorderIcon, count: pinnedIds.length },
          ]}
        />
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {sortedProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              sx={{
                position: "relative",
                maxWidth: 400,
                mx: "auto",
                borderRadius: 3,
                boxShadow: 4,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-6px)" },
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Tooltip
                title={pinnedIds.includes(project.id) ? t("projects.unpin") : t("projects.pin")}
                arrow
              >
                <IconButton
                  onClick={() => togglePin(project.id)}
                  aria-label={pinnedIds.includes(project.id) ? t("projects.unpin") : t("projects.pin")}
                  aria-pressed={pinnedIds.includes(project.id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    backgroundColor: "rgba(10, 25, 47, 0.7)",
                    color: pinnedIds.includes(project.id) ? "#ffd54f" : "#fff",
                    "&:hover": { backgroundColor: "rgba(10, 25, 47, 0.9)" },
                  }}
                >
                  {pinnedIds.includes(project.id) ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </Tooltip>

              {project.image ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                />
              ) : (
                <Box
                  aria-hidden
                  sx={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0a192f, #112240)",
                    color: "#64ffda",
                    fontSize: 64,
                    fontWeight: 700,
                  }}
                >
                  {(project.title || "?").charAt(0).toUpperCase()}
                </Box>
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{ fontWeight: "bold" }}
                >
                  {project.title}
                </Typography>

                {project.date && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 1 }}
                  >
                    {project.date}
                  </Typography>
                )}

                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>

                {/* Tech Icons Row */}
                <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
                  {project.tech.map((tech, i) => (
                    <Tooltip key={i} title={techIcons[tech].label} arrow>
                      <Box
                        sx={{
                          color: "grey",
                          "&:hover": { color: "#64ffda", cursor: "pointer" },
                          transition: "0.2s ease",
                        }}
                      >
                        {techIcons[tech].icon}
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </CardContent>

              <CardActions>
                {project.details && (
                  <Button
                    size="small"
                    component={RouterLink}
                    to={project.details}
                  >
                    {t("projects.detailsBtn")}
                  </Button>
                )}

                {project.liveLink && (
                  <Button
                    size="small"
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("projects.liveDemoBtn")}
                  </Button>
                )}

                {project.github && (
                  <Button
                    size="small"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("projects.githubBtn")}
                  </Button>
                )}

                {/* <Button
                  size="small"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}