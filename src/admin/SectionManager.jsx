import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Box, Button, Chip, CircularProgress, IconButton, Link, Paper, Stack, Switch, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { SECTIONS } from "../../api/_lib/sections.js";
import { MAX_DRAFT_BYTES, parseDraftFile } from "../../api/_lib/draftFile.js";
import { STATIC_ITEMS } from "../content/static";
import ClaudeCreateDialog from "./ClaudeCreateDialog";
import ItemEditor from "./ItemEditor";
import { deleteItem, listItems, patchItem, seedSection } from "./contentApi";

const publicHref = (row) => (row.data?.route ? `/${row.data.route}` : row.data?.detail ? `/projects/${row.slug}` : null);

// One generic list for ANY section, driven by the registry in api/_lib/sections.js.
export default function SectionManager({ section }) {
  const def = SECTIONS[section];
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  const [working, setWorking] = useState("");
  const [editor, setEditor] = useState(null); // { initial, docs, notes }
  const [claudeOpen, setClaudeOpen] = useState(false);
  const importInput = useRef(null);

  const load = useCallback(async () => {
    try {
      setRows(await listItems(section));
    } catch (e) {
      setError(e.message);
      setRows([]);
    }
  }, [section]);

  useEffect(() => {
    setRows(null);
    setError("");
    load();
  }, [load]);

  const act = async (label, fn) => {
    setWorking(label);
    setError("");
    try {
      await fn();
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setWorking("");
    }
  };

  const nextPosition = useMemo(() => (rows?.length ? Math.max(...rows.map((r) => r.position)) + 10 : 0), [rows]);
  const canSeed = rows && rows.length === 0 && (STATIC_ITEMS[section]?.length ?? 0) > 0;

  const move = (index, delta) =>
    act("Reordering…", async () => {
      const order = [...rows];
      const [item] = order.splice(index, 1);
      order.splice(index + delta, 0, item);
      for (let i = 0; i < order.length; i++) {
        if (order[i].position !== i * 10) await patchItem(section, order[i].id, { position: i * 10 });
      }
    });

  const remove = (row) => {
    if (!window.confirm(`Delete "${row.data?.[def.titleField] ?? row.slug}"? This cannot be undone.`)) return;
    act("Deleting…", () => deleteItem(section, row.id));
  };

  // A draft made on your computer by `npm run draft`. It opens in the normal editor; nothing is saved until you do.
  const importDraft = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_DRAFT_BYTES) return setError("That file is too large to be a draft (2 MB max).");
    const result = parseDraftFile(await file.text(), { section });
    if (!result.ok) return setError(result.error);
    setError("");
    const { data, translations, notes } = result.draft;
    const taken = new Set((rows ?? []).map((r) => r.slug));
    const base = result.draft.slug || "imported-draft";
    let slug = base;
    for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
    setEditor({
      initial: { slug, data, translations, published: false, position: nextPosition },
      docs: [],
      notes: ["Imported from a draft file. Review everything before publishing.", notes].filter(Boolean).join(" "),
    });
  };

  const openNew = () =>
    setEditor({ initial: { slug: "", data: {}, translations: {}, published: false, position: nextPosition }, docs: [], notes: "" });

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>{def.label}</Typography>
        <Button variant="outlined" startIcon={<UploadFileIcon />} onClick={() => importInput.current?.click()} disabled={!rows}>Import draft</Button>
        <input ref={importInput} type="file" hidden accept=".json,application/json" onChange={importDraft} />
        <Button variant="outlined" startIcon={<AddIcon />} onClick={openNew} disabled={!rows}>New {def.singular.toLowerCase()}</Button>
        <Button variant="contained" startIcon={<AutoAwesomeIcon />} onClick={() => setClaudeOpen(true)} disabled={!rows}>Create with Claude</Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}
      {working && <Alert severity="info" icon={<CircularProgress size={18} />} sx={{ mb: 2 }}>{working}</Alert>}

      {canSeed && (
        <Alert
          severity="warning"
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small" startIcon={<SystemUpdateAltIcon />} onClick={() => act("Importing…", () => seedSection(section))}>
              Import current content
            </Button>
          }
        >
          This section is not in the database yet, so the public site is showing its built-in content. Import it to start editing it here
          ({STATIC_ITEMS[section].length} entries, published exactly as they are today).
        </Alert>
      )}

      {rows === null ? (
        <Box sx={{ py: 6, textAlign: "center" }}><CircularProgress /></Box>
      ) : (
        <Stack spacing={1}>
          {rows.map((row, i) => {
            const href = publicHref(row);
            const sub = def.listFields.map((k) => row.data?.[k]).filter(Boolean).join(" · ");
            return (
              <Paper key={row.id} variant="outlined" sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                  <Typography fontWeight={600}>{row.data?.[def.titleField] || <i>(untitled)</i>}</Typography>
                  <Typography variant="caption" color="text.secondary">{[sub, row.slug].filter(Boolean).join(" · ")}</Typography>
                </Box>
                <Chip size="small" label={row.published ? "Published" : "Draft"} color={row.published ? "success" : "default"} variant={row.published ? "filled" : "outlined"} />
                <Tooltip title={row.published ? "Unpublish" : "Publish"}>
                  <Switch size="small" checked={row.published} disabled={!!working} onChange={(e) => act("Updating…", () => patchItem(section, row.id, { published: e.target.checked }))} slotProps={{ input: { "aria-label": "Published" } }} />
                </Tooltip>
                <IconButton size="small" aria-label="Move up" disabled={i === 0 || !!working} onClick={() => move(i, -1)}><ArrowUpwardIcon fontSize="small" /></IconButton>
                <IconButton size="small" aria-label="Move down" disabled={i === rows.length - 1 || !!working} onClick={() => move(i, 1)}><ArrowDownwardIcon fontSize="small" /></IconButton>
                {href && row.published && (
                  <Tooltip title="Open on the site">
                    <IconButton size="small" component={Link} href={href} target="_blank" rel="noopener" aria-label="Open on the site"><OpenInNewIcon fontSize="small" /></IconButton>
                  </Tooltip>
                )}
                <IconButton size="small" aria-label="Edit" onClick={() => setEditor({ initial: row, docs: [], notes: "" })}><EditIcon fontSize="small" /></IconButton>
                <IconButton size="small" aria-label="Delete" color="error" disabled={!!working} onClick={() => remove(row)}><DeleteOutlineIcon fontSize="small" /></IconButton>
              </Paper>
            );
          })}
          {rows.length === 0 && !canSeed && <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>Nothing here yet.</Typography>}
        </Stack>
      )}

      {claudeOpen && (
        <ClaudeCreateDialog
          section={section}
          onClose={() => setClaudeOpen(false)}
          onDraft={({ slug, data, notes, docs }) => {
            setClaudeOpen(false);
            setEditor({ initial: { slug, data, translations: {}, published: false, position: nextPosition }, docs, notes });
          }}
        />
      )}

      {editor && (
        <ItemEditor
          key={editor.initial.id ?? "new"}
          section={section}
          initial={editor.initial}
          initialDocs={editor.docs}
          initialNotes={editor.notes}
          onClose={() => setEditor(null)}
          onSaved={() => {
            setEditor(null);
            load();
          }}
        />
      )}
    </Box>
  );
}
