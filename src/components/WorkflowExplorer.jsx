import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  Button,
  Switch,
  FormControlLabel,
  Collapse,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { getWorkflowData } from "../JSON/i18n/registry";

const COLORS = {
  trigger: "#64ffda",
  extract: "#82aaff",
  combine: "#b69cff",
  agent: "#ffb454",
  model: "#8892b0",
  output: "#7ee787",
};
const BG = "#0a192f";
const CARD = "#112240";
const TEXT = "#e6f1ff";
const MUTED = "#8892b0";
const LINE = "rgba(136,146,176,0.25)";
const MIN_K = 0.12;
const MAX_K = 2.4;
const EMPTY = { canvas: { width: 1, height: 1 }, categories: [], lanes: [], nodes: [], edges: [], tour: [] };

function wrapLabel(text, max = 23, maxLines = 2) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].slice(0, max - 1)}…`;
    return kept;
  }
  return lines;
}

function rectOf(nodes, pad = 0) {
  const x1 = Math.min(...nodes.map((n) => n.x)) - pad;
  const y1 = Math.min(...nodes.map((n) => n.y)) - pad;
  const x2 = Math.max(...nodes.map((n) => n.x + n.w)) + pad;
  const y2 = Math.max(...nodes.map((n) => n.y + n.h)) + pad;
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}

function fitRect(r, size, pad = 28, maxK = 1.15) {
  const k = Math.max(MIN_K, Math.min((size.w - pad * 2) / r.w, (size.h - pad * 2) / r.h, maxK));
  return { k, x: (size.w - r.w * k) / 2 - r.x * k, y: (size.h - r.h * k) / 2 - r.y * k };
}

function edgePath(a, b, kind) {
  if (kind === "ai") {
    const x1 = a.x + a.w / 2, y1 = a.y, x2 = b.x + b.w / 2, y2 = b.y + b.h;
    return `M${x1} ${y1} C${x1} ${y1 - 45} ${x2} ${y2 + 45} ${x2} ${y2}`;
  }
  const x1 = a.x + a.w, y1 = a.y + a.h / 2, x2 = b.x, y2 = b.y + b.h / 2;
  const dx = Math.max(50, (x2 - x1) / 2);
  return `M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
}

function PanelSection({ label, children }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="overline" sx={{ color: MUTED, letterSpacing: 1, lineHeight: 1.5 }}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}

export default function WorkflowExplorer({ title, description, workflowId }) {
  const { t, i18n } = useTranslation();
  const uid = useId().replace(/:/g, "");
  const data = useMemo(
    () => getWorkflowData(workflowId, i18n.resolvedLanguage) || EMPTY,
    [workflowId, i18n.resolvedLanguage]
  );

  const [selectedId, setSelectedId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [laneFocus, setLaneFocus] = useState("all");
  const [tourStep, setTourStep] = useState(null);
  const [showSub, setShowSub] = useState(true);
  const [excerptOpen, setExcerptOpen] = useState(false);
  const [cam, setCam] = useState({ x: 0, y: 0, k: 0.3 });
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [userMoved, setUserMoved] = useState(false);
  const wrapRef = useRef(null);
  const dragRef = useRef(null);
  const reduced = useMemo(
    () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const nodeMap = useMemo(() => Object.fromEntries(data.nodes.map((n) => [n.id, n])), [data]);
  const visibleNodes = useMemo(
    () => (showSub ? data.nodes : data.nodes.filter((n) => n.category !== "model")),
    [data, showSub]
  );
  const visibleIds = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes]);
  const visibleEdges = useMemo(
    () => data.edges.filter((e) => visibleIds.has(e.from) && visibleIds.has(e.to)),
    [data, visibleIds]
  );
  const selected = selectedId && visibleIds.has(selectedId) ? nodeMap[selectedId] : null;
  const catLabel = useMemo(() => Object.fromEntries(data.categories.map((c) => [c.id, c.label])), [data]);
  const laneLabel = useMemo(() => Object.fromEntries(data.lanes.map((l) => [l.id, l.label])), [data]);

  // ---- camera ----
  const targetRect = useMemo(() => {
    const full = { x: 0, y: 0, w: data.canvas.width, h: data.canvas.height };
    if (tourStep !== null && data.tour[tourStep]) {
      const ids = new Set(data.tour[tourStep].nodes);
      const ns = visibleNodes.filter((n) => ids.has(n.id));
      return ns.length ? rectOf(ns, 40) : full;
    }
    if (laneFocus !== "all") {
      const lane = data.lanes.find((l) => l.id === laneFocus);
      if (lane) return { x: lane.x, y: lane.y, w: lane.w, h: lane.h };
    }
    return full;
  }, [data, tourStep, laneFocus, visibleNodes]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    setSize({ w: el.clientWidth, h: el.clientHeight });
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (size.w > 0 && !userMoved) {
      setCam(fitRect(targetRect, size));
      if (!ready) requestAnimationFrame(() => setReady(true));
    }
  }, [size, targetRect, userMoved, ready]);

  const zoomBy = (factor, cx = size.w / 2, cy = size.h / 2) => {
    setUserMoved(true);
    setCam((c) => {
      const k = Math.max(MIN_K, Math.min(MAX_K, c.k * factor));
      return { k, x: cx - (cx - c.x) * (k / c.k), y: cy - (cy - c.y) * (k / c.k) };
    });
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      zoomBy(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - rect.left, e.clientY - rect.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    dragRef.current = { sx: e.clientX, sy: e.clientY, cx: cam.x, cy: cam.y, moved: false };
  };
  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) > 4) {
      d.moved = true;
      setDragging(true);
      setUserMoved(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (d.moved) setCam((c) => ({ ...c, x: d.cx + dx, y: d.cy + dy }));
  };
  const endDrag = () => {
    dragRef.current = null;
    setDragging(false);
  };

  const refit = () => setUserMoved(false);
  const startTour = () => {
    setLaneFocus("all");
    setShowSub(true);
    setTourStep(0);
    refit();
  };
  const goTour = (i) => {
    setTourStep(i);
    refit();
  };
  const exitTour = () => {
    setTourStep(null);
    refit();
  };
  const chooseLane = (id) => {
    setTourStep(null);
    setSelectedId(null);
    setLaneFocus(id);
    refit();
  };
  const select = (id) => {
    setSelectedId(id);
    setExcerptOpen(false);
    const n = nodeMap[id];
    if (!n || size.w === 0) return;
    const sx = n.x * cam.k + cam.x;
    const sy = n.y * cam.k + cam.y;
    const inView = sx >= 0 && sy >= 0 && sx + n.w * cam.k <= size.w && sy + n.h * cam.k <= size.h;
    if (cam.k >= 0.45 && inView) return;
    const k = Math.max(cam.k, 0.6);
    setUserMoved(true);
    setCam({ k, x: size.w / 2 - (n.x + n.w / 2) * k, y: size.h / 2 - (n.y + n.h / 2) * k });
  };

  // ---- highlighting ----
  const focusId = hoverId ?? selected?.id ?? null;
  const activeSet = useMemo(() => {
    if (tourStep !== null && data.tour[tourStep]) return new Set(data.tour[tourStep].nodes);
    if (focusId) {
      const s = new Set([focusId]);
      visibleEdges.forEach((e) => {
        if (e.from === focusId) s.add(e.to);
        if (e.to === focusId) s.add(e.from);
      });
      return s;
    }
    if (laneFocus !== "all") return new Set(visibleNodes.filter((n) => n.lane === laneFocus).map((n) => n.id));
    return null;
  }, [tourStep, focusId, laneFocus, data, visibleEdges, visibleNodes]);

  const edgeState = (e) => {
    if (!activeSet) return "normal";
    if (tourStep === null && focusId) return e.from === focusId || e.to === focusId ? "active" : "dim";
    return activeSet.has(e.from) && activeSet.has(e.to) ? "active" : "dim";
  };

  const incoming = selected ? visibleEdges.filter((e) => e.to === selected.id && e.kind === "main") : [];
  const outgoing = selected ? visibleEdges.filter((e) => e.from === selected.id && e.kind === "main") : [];
  const usesSubs = selected ? visibleEdges.filter((e) => e.to === selected.id && e.kind === "ai") : [];
  const attachedTo = selected ? visibleEdges.filter((e) => e.from === selected.id && e.kind === "ai") : [];
  const step = tourStep !== null ? data.tour[tourStep] : null;
  const agentLanes = data.lanes.filter((l) => l.id !== "input");

  const nodeLink = (id, note, key) => (
    <Chip
      key={key}
      size="small"
      label={note ? `${nodeMap[id].label} · ${note}` : nodeMap[id].label}
      onClick={() => select(id)}
      sx={{
        m: 0.25,
        maxWidth: "100%",
        color: TEXT,
        bgcolor: "transparent",
        border: `1px solid ${COLORS[nodeMap[id].category]}`,
        "&:hover": { bgcolor: "rgba(100,255,218,0.1)" },
      }}
    />
  );

  const markerId = (s) => `${uid}-arrow-${s}`;
  const arrowColors = { dim: "#4a5f86", normal: "#6b7fa8", active: COLORS.trigger };

  return (
    <Box sx={{ mb: 3 }}>
      {title && (
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}

      <Paper elevation={4} sx={{ bgcolor: BG, color: TEXT, borderRadius: 3, overflow: "hidden" }}>
        {/* Tour / controls */}
        <Box sx={{ p: 1.5, borderBottom: `1px solid ${LINE}` }}>
          {step ? (
            <Box aria-live="polite" sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center" }}>
              <Box sx={{ flex: "1 1 320px", minWidth: 0 }}>
                <Typography variant="caption" sx={{ color: COLORS.trigger, fontWeight: 600 }}>
                  {t("workflow.step", { current: tourStep + 1, total: data.tour.length })}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", lineHeight: 1.3 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(230,241,255,0.8)" }}>
                  {step.body}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  startIcon={<NavigateBeforeIcon />}
                  disabled={tourStep === 0}
                  onClick={() => goTour(tourStep - 1)}
                  sx={{ color: COLORS.trigger, "&.Mui-disabled": { color: "rgba(136,146,176,0.5)" } }}
                >
                  {t("workflow.back")}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<NavigateNextIcon />}
                  disabled={tourStep === data.tour.length - 1}
                  onClick={() => goTour(tourStep + 1)}
                  sx={{ bgcolor: COLORS.trigger, color: BG, "&:hover": { bgcolor: "#52e0c4" } }}
                >
                  {t("workflow.next")}
                </Button>
                <Button size="small" onClick={exitTour} sx={{ color: MUTED }}>
                  {t("workflow.exitTour")}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center" }}>
              <Button
                size="small"
                variant="contained"
                startIcon={<PlayArrowIcon />}
                onClick={startTour}
                sx={{ bgcolor: COLORS.trigger, color: BG, fontWeight: "bold", "&:hover": { bgcolor: "#52e0c4" } }}
              >
                {t("workflow.startTour")}
              </Button>
              <Typography variant="caption" sx={{ color: MUTED }}>
                {t("workflow.hint")}
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            px: 1.5,
            py: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            alignItems: "center",
            borderBottom: `1px solid ${LINE}`,
          }}
        >
          <Typography variant="caption" sx={{ color: MUTED, mr: 0.5 }}>
            {t("workflow.focus")}
          </Typography>
          {[{ id: "all", label: t("workflow.allLanes") }, ...agentLanes.map((l) => ({ id: l.id, label: l.label.split(" · ")[0] }))].map(
            (l) => (
              <Chip
                key={l.id}
                size="small"
                label={l.label}
                onClick={() => chooseLane(l.id)}
                sx={{
                  color: laneFocus === l.id && tourStep === null ? BG : TEXT,
                  bgcolor: laneFocus === l.id && tourStep === null ? COLORS.trigger : "transparent",
                  border: `1px solid ${laneFocus === l.id && tourStep === null ? COLORS.trigger : LINE}`,
                  "&:hover": { bgcolor: laneFocus === l.id && tourStep === null ? "#52e0c4" : "rgba(100,255,218,0.1)" },
                }}
              />
            )
          )}
          <Box sx={{ flexGrow: 1 }} />
          <FormControlLabel
            sx={{ m: 0, color: MUTED, "& .MuiFormControlLabel-label": { fontSize: 12 } }}
            control={
              <Switch
                size="small"
                checked={showSub}
                onChange={(e) => setShowSub(e.target.checked)}
                sx={{ "& .Mui-checked + .MuiSwitch-track": { bgcolor: COLORS.trigger } }}
              />
            }
            label={t("workflow.showSub")}
          />
          <Box sx={{ display: "flex" }}>
            {[
              { label: t("workflow.zoomOut"), icon: <RemoveIcon fontSize="small" />, fn: () => zoomBy(1 / 1.25) },
              { label: t("workflow.zoomIn"), icon: <AddIcon fontSize="small" />, fn: () => zoomBy(1.25) },
              { label: t("workflow.fit"), icon: <FitScreenIcon fontSize="small" />, fn: refit },
            ].map((b) => (
              <Tooltip key={b.label} title={b.label} arrow>
                <IconButton size="small" aria-label={b.label} onClick={b.fn} sx={{ color: TEXT }}>
                  {b.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>

        {/* Canvas + panel */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0,1fr)", md: "minmax(0,1fr) 360px" } }}>
          <Box
            ref={wrapRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            sx={{
              position: "relative",
              height: { xs: 420, md: 560 },
              overflow: "hidden",
              cursor: dragging ? "grabbing" : "grab",
              touchAction: "pan-y",
              userSelect: "none",
              backgroundImage: "radial-gradient(rgba(136,146,176,0.18) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            <svg width="100%" height="100%" role="group" aria-label={t("workflow.canvasLabel")}>
              <defs>
                {Object.entries(arrowColors).map(([s, c]) => (
                  <marker
                    key={s}
                    id={markerId(s)}
                    markerWidth="9"
                    markerHeight="9"
                    refX="8"
                    refY="4.5"
                    orient="auto"
                    markerUnits="userSpaceOnUse"
                  >
                    <path d="M0 0 L9 4.5 L0 9 z" fill={c} />
                  </marker>
                ))}
              </defs>
              <g
                style={{
                  transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.k})`,
                  transition: dragging || reduced || !ready ? "none" : "transform 450ms cubic-bezier(.2,.7,.2,1)",
                }}
              >
                {data.lanes.map((l) => (
                  <g key={l.id}>
                    <rect
                      x={l.x}
                      y={l.y}
                      width={l.w}
                      height={l.h}
                      rx={18}
                      fill={l.id === "orchestrator" ? "rgba(255,180,84,0.04)" : "rgba(100,255,218,0.035)"}
                      stroke={LINE}
                      strokeDasharray="6 6"
                    />
                    <text x={l.x + 18} y={l.y + 28} fontSize="15" fontWeight="600" fill={MUTED}>
                      {l.label}
                    </text>
                  </g>
                ))}

                {visibleEdges.map((e, i) => {
                  const a = nodeMap[e.from];
                  const b = nodeMap[e.to];
                  const s = edgeState(e);
                  return (
                    <path
                      key={i}
                      d={edgePath(a, b, e.kind)}
                      fill="none"
                      stroke={arrowColors[s]}
                      strokeWidth={s === "active" ? 2.6 : 1.6}
                      strokeDasharray={e.kind === "ai" ? "5 4" : undefined}
                      opacity={s === "dim" ? 0.14 : 1}
                      markerEnd={`url(#${markerId(s)})`}
                    />
                  );
                })}

                {visibleNodes.map((n) => {
                  const dim = activeSet && !activeSet.has(n.id);
                  const isSel = selected?.id === n.id;
                  const color = COLORS[n.category];
                  const lines = wrapLabel(n.label);
                  return (
                    <g
                      key={n.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${n.label}. ${n.summary}`}
                      aria-pressed={isSel}
                      onClick={() => select(n.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          select(n.id);
                        }
                      }}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setHoverId(n.id)}
                      onPointerLeave={() => setHoverId(null)}
                      onFocus={() => setHoverId(n.id)}
                      onBlur={() => setHoverId(null)}
                      style={{ cursor: "pointer", outline: "none" }}
                      opacity={dim ? 0.25 : 1}
                    >
                      <rect
                        x={n.x}
                        y={n.y}
                        width={n.w}
                        height={n.h}
                        rx={10}
                        fill={CARD}
                        stroke={isSel ? "#ffffff" : color}
                        strokeWidth={isSel ? 3 : 1.5}
                        strokeDasharray={n.category === "model" ? "4 3" : undefined}
                      />
                      <rect x={n.x} y={n.y + 8} width={5} height={n.h - 16} rx={2.5} fill={color} />
                      <text x={n.x + 16} y={n.y + 18} fontSize="10" fill={color} letterSpacing="0.6">
                        {n.typeLabel.toUpperCase()}
                      </text>
                      {lines.map((ln, i) => (
                        <text key={i} x={n.x + 16} y={n.y + 36 + i * 16} fontSize="13" fontWeight="600" fill={TEXT}>
                          {ln}
                        </text>
                      ))}
                    </g>
                  );
                })}
              </g>
            </svg>
          </Box>

          {/* Detail panel */}
          <Box
            sx={{
              p: 2,
              borderTop: { xs: `1px solid ${LINE}`, md: "none" },
              borderLeft: { md: `1px solid ${LINE}` },
              maxHeight: { md: 560 },
              overflowY: "auto",
            }}
          >
            {selected ? (
              <Box>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
                      <Chip
                        size="small"
                        label={catLabel[selected.category]}
                        sx={{ bgcolor: COLORS[selected.category], color: BG, fontWeight: 600 }}
                      />
                      <Chip size="small" variant="outlined" label={selected.typeLabel} sx={{ color: TEXT, borderColor: LINE }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", lineHeight: 1.25 }}>
                      {selected.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: MUTED }}>
                      {laneLabel[selected.lane]}
                    </Typography>
                  </Box>
                  <IconButton size="small" aria-label={t("workflow.close")} onClick={() => setSelectedId(null)} sx={{ color: MUTED }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Typography variant="body2" sx={{ mt: 1.5, color: "rgba(230,241,255,0.9)" }}>
                  {selected.summary}
                </Typography>

                <PanelSection label={t("workflow.panel.logic")}>
                  <Box component="ul" sx={{ m: 0, mt: 0.5, pl: 2.5 }}>
                    {selected.logic.map((l, i) => (
                      <Typography key={i} component="li" variant="body2" sx={{ mb: 0.75, color: "rgba(230,241,255,0.85)" }}>
                        {l}
                      </Typography>
                    ))}
                  </Box>
                </PanelSection>

                {selected.config?.length > 0 && (
                  <PanelSection label={t("workflow.panel.config")}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                      {selected.config.map((c) => (
                        <Chip key={c} size="small" label={c} sx={{ bgcolor: "rgba(100,255,218,0.12)", color: COLORS.trigger }} />
                      ))}
                    </Box>
                  </PanelSection>
                )}

                <PanelSection label={t("workflow.panel.dataIn")}>
                  <Box component="ul" sx={{ m: 0, mt: 0.5, pl: 2.5 }}>
                    {selected.inputs.map((l, i) => (
                      <Typography key={i} component="li" variant="body2" sx={{ color: "rgba(230,241,255,0.85)" }}>
                        {l}
                      </Typography>
                    ))}
                  </Box>
                </PanelSection>
                <PanelSection label={t("workflow.panel.dataOut")}>
                  <Box component="ul" sx={{ m: 0, mt: 0.5, pl: 2.5 }}>
                    {selected.outputs.map((l, i) => (
                      <Typography key={i} component="li" variant="body2" sx={{ color: "rgba(230,241,255,0.85)" }}>
                        {l}
                      </Typography>
                    ))}
                  </Box>
                </PanelSection>

                {incoming.length > 0 && (
                  <PanelSection label={t("workflow.panel.receivesFrom")}>
                    <Box sx={{ mt: 0.5 }}>
                      {incoming.map((e, i) => (
                        nodeLink(e.from, selected.ports?.[e.toPort], i)
                      ))}
                    </Box>
                  </PanelSection>
                )}
                {outgoing.length > 0 && (
                  <PanelSection label={t("workflow.panel.sendsTo")}>
                    <Box sx={{ mt: 0.5 }}>
                      {outgoing.map((e, i) => (
                        nodeLink(e.to, undefined, i)
                      ))}
                    </Box>
                  </PanelSection>
                )}
                {usesSubs.length > 0 && (
                  <PanelSection label={t("workflow.panel.uses")}>
                    <Box sx={{ mt: 0.5 }}>
                      {usesSubs.map((e, i) => (
                        nodeLink(e.from, undefined, i)
                      ))}
                    </Box>
                  </PanelSection>
                )}
                {attachedTo.length > 0 && (
                  <PanelSection label={t("workflow.panel.attachedTo")}>
                    <Box sx={{ mt: 0.5 }}>
                      {attachedTo.map((e, i) => (
                        nodeLink(e.to, undefined, i)
                      ))}
                    </Box>
                  </PanelSection>
                )}

                {selected.excerpt && (
                  <Box sx={{ mt: 2 }}>
                    <Button
                      size="small"
                      onClick={() => setExcerptOpen((o) => !o)}
                      aria-expanded={excerptOpen}
                      sx={{ color: COLORS.trigger, textTransform: "none", px: 0 }}
                    >
                      {excerptOpen ? t("workflow.panel.hideExcerpt") : t("workflow.panel.showExcerpt")}: {selected.excerptTitle}
                    </Button>
                    <Collapse in={excerptOpen} unmountOnExit>
                      <Box
                        component="pre"
                        tabIndex={0}
                        sx={{
                          m: 0,
                          mt: 1,
                          p: 1.5,
                          maxHeight: 280,
                          overflow: "auto",
                          bgcolor: "#06101f",
                          border: `1px solid ${LINE}`,
                          borderRadius: 1.5,
                          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                          fontSize: 11.5,
                          lineHeight: 1.5,
                          color: "#cfe3ff",
                          whiteSpace: "pre",
                        }}
                      >
                        {selected.excerpt}
                      </Box>
                    </Collapse>
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{ color: MUTED }}>
                <Typography variant="subtitle2" sx={{ color: TEXT, fontWeight: "bold", mb: 1 }}>
                  {t("workflow.panel.emptyTitle")}
                </Typography>
                <Typography variant="body2">{t("workflow.panel.emptyBody")}</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Legend */}
        <Box
          sx={{
            px: 1.5,
            py: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            alignItems: "center",
            borderTop: `1px solid ${LINE}`,
          }}
        >
          {data.categories.map((c) => (
            <Box key={c.id} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: "3px", bgcolor: COLORS[c.id] }} />
              <Typography variant="caption" sx={{ color: MUTED }}>
                {c.label}
              </Typography>
            </Box>
          ))}
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="caption" sx={{ color: MUTED }}>
            {t("workflow.counts", { nodes: data.nodes.length, edges: data.edges.length })}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
