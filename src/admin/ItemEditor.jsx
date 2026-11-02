import React, { useMemo, useRef, useState } from "react";
import {
  Accordion, AccordionDetails, AccordionSummary, Alert, AppBar, Box, Button, Chip, CircularProgress, Dialog,
  DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Paper, Stack, Switch, Tab, Tabs,
  TextField, Toolbar, Typography,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TranslateIcon from "@mui/icons-material/Translate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  LOCALE_NAMES, SECTIONS, TARGET_LOCALES, fieldsOf, normalizeFields, sameDetailShape, validateItemData,
  validateProjectDetail,
} from "../../api/_lib/sections.js";
import ProjectDetailComponent from "../components/ProjectDetailComponent";
import FieldInput from "./FieldInput";
import { askClaude, removeDocuments, saveItem, uploadDocument, uploadImage } from "./contentApi";

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,62}$/;
const MAX_DOCS = 8;
const isEmpty = (v) => v === undefined || v === null || v === "" || (Array.isArray(v) && v.every((x) => !String(x).trim()));

export default function ItemEditor({ section, initial, initialDocs = [], initialNotes = "", onClose, onSaved }) {
  const def = SECTIONS[section];
  const isNew = !initial.id;

  const [slug, setSlug] = useState(initial.slug ?? "");
  const [published, setPublished] = useState(!!initial.published);
  const [data, setData] = useState(initial.data ?? {});
  const [translations, setTranslations] = useState(initial.translations ?? {});
  const [tab, setTab] = useState("en");
  const [docs, setDocs] = useState(initialDocs);
  const [jsonErrors, setJsonErrors] = useState({});
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState(null);
  const [notes, setNotes] = useState(initialNotes);
  const [refineText, setRefineText] = useState("");
  const [detailHint, setDetailHint] = useState("");
  const [preview, setPreview] = useState(null);
  const [version, setVersion] = useState(0); // bumped when data is replaced from outside, to remount inputs
  const dirty = useRef(isNew);
  const fileInput = useRef(null);

  const hasDetailField = fieldsOf(section, { json: true }).length > 0;
  const editableFields = useMemo(() => fieldsOf(section), [section]);
  const docRefs = docs.map(({ path, name }) => ({ path, name }));

  const touch = () => { dirty.current = true; };
  const setField = (key, value) => { touch(); setData((d) => ({ ...d, [key]: value })); };
  const setTranslated = (lang, key, value) => {
    touch();
    setTranslations((t) => {
      const next = { ...(t[lang] ?? {}) };
      if (isEmpty(value)) delete next[key];
      else next[key] = value;
      return { ...t, [lang]: next };
    });
  };
  const onValidity = (scope) => (key, msg) =>
    setJsonErrors((e) => {
      const k = `${scope}:${key}`;
      if (!msg && !(k in e)) return e;
      const next = { ...e };
      if (msg) next[k] = msg;
      else delete next[k];
      return next;
    });

  const run = async (label, fn) => {
    setBusy(label);
    setMessage(null);
    try {
      await fn();
    } catch (e) {
      setMessage({ severity: "error", text: e.message });
    } finally {
      setBusy("");
    }
  };

  const tokens = (u) => (u ? ` (${u.input_tokens.toLocaleString()} in / ${u.output_tokens.toLocaleString()} out tokens)` : "");
  const keepFields = () => Object.fromEntries(def.fields.filter((f) => (f.internal || f.type === "json") && data[f.key] !== undefined).map((f) => [f.key, data[f.key]]));
  const plainFields = () => Object.fromEntries(fieldsOf(section, { json: false }).filter((f) => !isEmpty(data[f.key])).map((f) => [f.key, data[f.key]]));

  // ---- Claude actions --------------------------------------------------------
  const attach = (e) => {
    const files = [...(e.target.files ?? [])];
    e.target.value = "";
    if (!files.length) return;
    if (docs.length + files.length > MAX_DOCS) return setMessage({ severity: "warning", text: `You can attach up to ${MAX_DOCS} documents.` });
    run("Uploading documents…", async () => {
      const added = [];
      for (const f of files) added.push(await uploadDocument(f));
      setDocs((d) => [...d, ...added]);
    });
  };

  const refine = () =>
    run("Refining with Claude…", async () => {
      const res = await askClaude({ mode: "refine", section, instructions: refineText, fields: plainFields(), files: docRefs });
      touch();
      setData({ ...keepFields(), ...res.data });
      setVersion((v) => v + 1);
      setNotes(res.notes || "");
      setRefineText("");
      setMessage({ severity: "success", text: `Draft updated${tokens(res.usage)}. Review it below.` });
    });

  const generateDetail = () =>
    run("Writing the details page… (this can take a minute or two)", async () => {
      const res = await askClaude({ mode: "generate", scope: "detail", section, instructions: detailHint, fields: plainFields(), files: docRefs });
      touch();
      setData((d) => ({ ...d, ...res.data }));
      setJsonErrors({});
      setVersion((v) => v + 1);
      setNotes(res.notes || "");
      setMessage({ severity: "success", text: `Details page written${tokens(res.usage)}. Open the Details page section to review it.` });
    });

  const translate = (lang) =>
    run(`Translating to ${LOCALE_NAMES[lang]}…`, async () => {
      const source = Object.fromEntries(fieldsOf(section, { translatableOnly: true, json: false }).filter((f) => !isEmpty(data[f.key])).map((f) => [f.key, data[f.key]]));
      const res = await askClaude({ mode: "translate", section, locale: lang, fields: source });
      let overlay = res.translation;
      let used = res.usage;
      if (hasDetailField && data.detail) {
        const d = await askClaude({ mode: "translate", scope: "detail", section, locale: lang, fields: { detail: data.detail } });
        overlay = { ...overlay, ...d.translation };
        used = { input_tokens: used.input_tokens + d.usage.input_tokens, output_tokens: used.output_tokens + d.usage.output_tokens };
      }
      touch();
      setTranslations((t) => ({ ...t, [lang]: overlay }));
      setJsonErrors({});
      setVersion((v) => v + 1);
      setMessage({ severity: "success", text: `Translated to ${LOCALE_NAMES[lang]}${tokens(used)}. Please review before saving.` });
    });

  // ---- Save ------------------------------------------------------------------
  const save = () =>
    run("Saving…", async () => {
      const problems = [];
      if (isNew && !SLUG_RE.test(slug)) problems.push("The URL name (slug) must use lowercase letters, numbers and hyphens.");
      if (Object.keys(jsonErrors).length) problems.push("Fix the highlighted JSON before saving.");

      const cleaned = { ...normalizeFields(section, data).data, ...Object.fromEntries(def.fields.filter((f) => f.internal && data[f.key] !== undefined).map((f) => [f.key, data[f.key]])) };
      problems.push(...validateItemData(section, cleaned));

      const cleanedTr = {};
      for (const lang of TARGET_LOCALES) {
        const tr = normalizeFields(section, translations[lang] ?? {}, { translatableOnly: true }).data;
        if (tr.detail) {
          if (!cleaned.detail) delete tr.detail;
          else {
            problems.push(...validateProjectDetail(tr.detail).map((m) => `${LOCALE_NAMES[lang]} details page: ${m}`));
            if (!sameDetailShape(cleaned.detail, tr.detail)) problems.push(`The ${LOCALE_NAMES[lang]} details page must keep the same structure as the English one (same tabs, blocks and list lengths).`);
          }
        }
        if (Object.keys(tr).length) cleanedTr[lang] = tr;
      }
      if (problems.length) throw new Error(problems.join(" "));

      const row = await saveItem(section, { id: initial.id, slug, data: cleaned, translations: cleanedTr, position: initial.position ?? 0, published });
      await removeDocuments(docs.map((d) => d.path));
      dirty.current = false;
      onSaved(row);
    });

  const close = async () => {
    if (busy) return;
    if (dirty.current && !window.confirm("Discard your unsaved changes?")) return;
    await removeDocuments(docs.map((d) => d.path));
    onClose();
  };

  // ---- Rendering ------------------------------------------------------------
  const tabFields = tab === "en" ? editableFields : fieldsOf(section, { translatableOnly: true });
  const valueFor = (f) => (tab === "en" ? data[f.key] : translations[tab]?.[f.key]);
  const detailToPreview = tab === "en" ? data.detail : translations[tab]?.detail || data.detail;

  const renderField = (f) => {
    const input = (
      <FieldInput
        key={`${tab}:${f.key}:${version}`}
        field={f}
        value={valueFor(f)}
        placeholder={tab === "en" ? undefined : data[f.key]}
        onChange={(v) => (tab === "en" ? setField(f.key, v) : setTranslated(tab, f.key, v))}
        onValidity={onValidity(tab)}
        onUploadImage={uploadImage}
        disabled={!!busy}
      />
    );
    if (f.type !== "json") return <Box key={`${tab}:${f.key}`}>{input}</Box>;
    return (
      <Accordion key={`${tab}:${f.key}`} variant="outlined" disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>{f.label}</Typography>
          <Chip size="small" sx={{ ml: 1.5 }} label={valueFor(f) ? "present" : "empty"} color={valueFor(f) ? "success" : "default"} variant="outlined" />
        </AccordionSummary>
        <AccordionDetails>{input}</AccordionDetails>
      </Accordion>
    );
  };

  return (
    <>
      <Dialog open fullWidth maxWidth="lg" onClose={close} scroll="paper">
        <DialogTitle sx={{ pb: 0 }}>
          {isNew ? `New ${def.singular.toLowerCase()}` : `Edit ${def.singular.toLowerCase()}`}
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mt: 1 }}>
            <Tab value="en" label="English" />
            {TARGET_LOCALES.map((l) => (
              <Tab key={l} value={l} label={LOCALE_NAMES[l].split(" (")[0]} icon={translations[l] && Object.keys(translations[l]).length ? <Chip size="small" label="✓" color="success" /> : undefined} iconPosition="end" />
            ))}
          </Tabs>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2.5}>
            {busy && (
              <Alert severity="info" icon={<CircularProgress size={18} />}>{busy}</Alert>
            )}
            {message && <Alert severity={message.severity} onClose={() => setMessage(null)}>{message.text}</Alert>}
            {notes && <Alert severity="info" onClose={() => setNotes("")}><b>Notes from Claude:</b> {notes}</Alert>}

            {tab === "en" ? (
              <>
                <TextField
                  size="small" label="URL name (slug)" value={slug} disabled={!isNew || !!busy}
                  onChange={(e) => { touch(); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-")); }}
                  helperText={isNew ? "Lowercase letters, numbers and hyphens. Can't be changed later." : "Fixed after creation."}
                  error={isNew && !!slug && !SLUG_RE.test(slug)}
                />
                {editableFields.map(renderField)}
                <FormControlLabel control={<Switch checked={published} onChange={(e) => { touch(); setPublished(e.target.checked); }} />} label={published ? "Published (visible on the public site)" : "Draft (hidden from the public site)"} />

                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                      <AutoAwesomeIcon fontSize="small" color="primary" /> Claude assistant
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
                      <Button size="small" variant="outlined" startIcon={<AttachFileIcon />} onClick={() => fileInput.current?.click()} disabled={!!busy}>
                        Attach documents
                      </Button>
                      <input ref={fileInput} type="file" hidden multiple accept=".pdf,.docx,.txt,.md,.json,.csv,.png,.jpg,.jpeg,.webp,.gif" onChange={attach} />
                      {docs.map((d) => (
                        <Chip key={d.path} size="small" label={d.name} onDelete={() => { setDocs((x) => x.filter((y) => y.path !== d.path)); removeDocuments([d.path]); }} />
                      ))}
                      {!docs.length && <Typography variant="caption" color="text.secondary">PDF, Word, text/JSON/CSV or images. Removed when you close this editor.</Typography>}
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <TextField fullWidth size="small" label="Ask Claude to revise this draft" placeholder="e.g. Shorten the description and mention the n8n workflow" value={refineText} onChange={(e) => setRefineText(e.target.value)} disabled={!!busy} />
                      <Button variant="contained" onClick={refine} disabled={!!busy || !refineText.trim()} sx={{ whiteSpace: "nowrap" }}>Refine</Button>
                    </Box>
                    {hasDetailField && (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField fullWidth size="small" label="Details page: what should it cover? (optional)" placeholder="e.g. 4 tabs: overview, architecture, results, team" value={detailHint} onChange={(e) => setDetailHint(e.target.value)} disabled={!!busy} />
                        <Button variant="outlined" onClick={generateDetail} disabled={!!busy || (!docs.length && !detailHint.trim() && isEmpty(data.description))} sx={{ whiteSpace: "nowrap" }}>
                          {data.detail ? "Rewrite details page" : "Write details page"}
                        </Button>
                      </Box>
                    )}
                  </Stack>
                </Paper>
              </>
            ) : (
              <>
                <Alert severity="info">
                  Only the translatable fields are shown. Anything left empty falls back to the English text on the public site.
                </Alert>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="contained" startIcon={<TranslateIcon />} onClick={() => translate(tab)} disabled={!!busy}>
                    Translate to {LOCALE_NAMES[tab].split(" (")[0]} with Claude
                  </Button>
                  <Button onClick={() => { touch(); setTranslations((t) => ({ ...t, [tab]: {} })); setJsonErrors({}); setVersion((v) => v + 1); }} disabled={!!busy}>Clear</Button>
                </Box>
                {tabFields.map(renderField)}
              </>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 1.5 }}>
          {hasDetailField && detailToPreview && (
            <Button startIcon={<VisibilityIcon />} onClick={() => setPreview(detailToPreview)} sx={{ mr: "auto" }}>Preview details page</Button>
          )}
          <Button onClick={close} disabled={!!busy}>Cancel</Button>
          <Button variant="contained" onClick={save} disabled={!!busy || Object.keys(jsonErrors).length > 0}>{isNew ? "Create" : "Save"}</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!preview} fullScreen onClose={() => setPreview(null)}>
        <AppBar position="sticky" color="default" elevation={1}>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>Preview ({tab === "en" ? "English" : LOCALE_NAMES[tab].split(" (")[0]})</Typography>
            <IconButton edge="end" onClick={() => setPreview(null)} aria-label="Close preview"><CloseIcon /></IconButton>
          </Toolbar>
        </AppBar>
        {preview && <ProjectDetailComponent data={preview} preview />}
      </Dialog>
    </>
  );
}
