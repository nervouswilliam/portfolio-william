import React, { useRef, useState } from "react";
import {
  Alert, Box, Button, Checkbox, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel, Stack, TextField, Typography,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { SECTIONS, fieldsOf } from "../../api/_lib/sections.js";
import { askClaude, removeDocuments, uploadDocument } from "./contentApi";

const MAX_FILES = 8;
const MAX_BYTES = 10 * 1024 * 1024;

// Step 1 of "create with Claude": documents + wishes in, a reviewable draft out.
// Nothing is saved here; the draft opens in the normal editor.
export default function ClaudeCreateDialog({ section, onClose, onDraft }) {
  const def = SECTIONS[section];
  const hasDetail = fieldsOf(section, { json: true }).length > 0;
  const [instructions, setInstructions] = useState("");
  const [files, setFiles] = useState([]);
  const [alsoDetail, setAlsoDetail] = useState(hasDetail);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const input = useRef(null);

  const pick = (e) => {
    const picked = [...(e.target.files ?? [])];
    e.target.value = "";
    const tooBig = picked.find((f) => f.size > MAX_BYTES);
    if (tooBig) return setError(`"${tooBig.name}" is larger than 10 MB.`);
    if (files.length + picked.length > MAX_FILES) return setError(`You can attach up to ${MAX_FILES} documents.`);
    setError("");
    setFiles((f) => [...f, ...picked]);
  };

  const create = async () => {
    setError("");
    const uploaded = [];
    try {
      setBusy("Uploading your documents…");
      for (const f of files) uploaded.push(await uploadDocument(f));
      const refs = uploaded.map(({ path, name }) => ({ path, name }));

      setBusy("Claude is reading your documents and drafting…");
      const draft = await askClaude({ mode: "generate", scope: "fields", section, instructions, files: refs });
      let data = draft.data;
      let notes = draft.notes || "";
      const readNotes = draft.readNotes ?? [];
      let note = [notes, ...readNotes].filter(Boolean).join(" ");

      if (alsoDetail && hasDetail) {
        setBusy("Writing the details page… (this can take a minute or two)");
        try {
          const detail = await askClaude({ mode: "generate", scope: "detail", section, instructions, fields: data, files: refs });
          data = { ...data, ...detail.data };
          note = [note, detail.notes].filter(Boolean).join(" ");
        } catch (e) {
          note = `${note} The details page could not be written (${e.message}). You can retry it from the editor.`.trim();
        }
      }
      onDraft({ slug: draft.slug, data, notes: note, docs: uploaded });
    } catch (e) {
      await removeDocuments(uploaded.map((u) => u.path));
      setError(e.message);
      setBusy("");
    }
  };

  const cancel = () => { if (!busy) onClose(); };

  return (
    <Dialog open fullWidth maxWidth="sm" onClose={cancel}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <AutoAwesomeIcon color="primary" /> Create {def.singular.toLowerCase()} with Claude
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Attach documents (reports, CVs, notes, exported workflows…) and say what you want. Claude drafts it, and you review and edit
            everything before anything is published.
          </Typography>
          {error && <Alert severity="error" onClose={() => setError("")}>{error}</Alert>}
          {busy && <Alert severity="info" icon={<CircularProgress size={18} />}>{busy}</Alert>}

          <TextField
            multiline minRows={4} fullWidth label="What do you want?" value={instructions} disabled={!!busy}
            placeholder={section === "project" ? "e.g. Add this lab as a project. Focus on how the agents work together. I handled the data-prep part." : "Describe what to add, and anything Claude should emphasise or leave out."}
            onChange={(e) => setInstructions(e.target.value)}
            helperText="Tip: say what YOU personally did. Claude only credits you with what the materials or your words support."
          />

          <Box>
            <Button variant="outlined" startIcon={<AttachFileIcon />} onClick={() => input.current?.click()} disabled={!!busy}>Attach documents</Button>
            <input ref={input} type="file" hidden multiple accept=".pdf,.docx,.txt,.md,.json,.csv,.png,.jpg,.jpeg,.webp,.gif" onChange={pick} />
            <Box sx={{ mt: 1, display: "flex", gap: 0.75, flexWrap: "wrap" }}>
              {files.map((f, i) => <Chip key={`${f.name}${i}`} size="small" label={f.name} onDelete={busy ? undefined : () => setFiles((x) => x.filter((_, j) => j !== i))} />)}
              {!files.length && <Typography variant="caption" color="text.secondary">PDF, Word (.docx), text/JSON/CSV/Markdown, images. Up to 8 files, 10 MB each.</Typography>}
            </Box>
          </Box>

          {hasDetail && (
            <FormControlLabel control={<Checkbox checked={alsoDetail} onChange={(e) => setAlsoDetail(e.target.checked)} disabled={!!busy} />} label="Also write the full details page (takes longer)" />
          )}
          <Typography variant="caption" color="text.secondary">
            Your documents are sent to Claude (Anthropic) to produce the draft, and are deleted from storage when you close the editor.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 1.5 }}>
        <Button onClick={cancel} disabled={!!busy}>Cancel</Button>
        <Button variant="contained" onClick={create} disabled={!!busy || (!files.length && !instructions.trim())} startIcon={<AutoAwesomeIcon />}>
          Create draft
        </Button>
      </DialogActions>
    </Dialog>
  );
}
