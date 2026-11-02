import React, { useRef, useState } from "react";
import { Autocomplete, Box, Button, Chip, TextField } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { validateProjectDetail } from "../../api/_lib/sections.js";

const mono = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", fontSize: 12.5, lineHeight: 1.5 };

// JSON-typed fields keep their own text while you type, so a half-finished edit
// never overwrites the saved value. Invalid text is reported upward (onValidity).
// The parent remounts this component (via `key`) when the value is replaced from
// outside, e.g. by Claude, so the text is only ever initialised once.
function JsonField({ field, value, onChange, onValidity, placeholder }) {
  const [text, setText] = useState(() => (value === undefined || value === null ? "" : JSON.stringify(value, null, 2)));
  const [error, setError] = useState("");

  const handle = (next) => {
    setText(next);
    if (!next.trim()) {
      setError("");
      onValidity?.(field.key, "");
      return onChange(undefined);
    }
    let parsed;
    try {
      parsed = JSON.parse(next);
    } catch (e) {
      const message = `Not valid JSON yet: ${e.message}`;
      setError(message);
      return onValidity?.(field.key, message);
    }
    const problems = field.kind === "projectDetail" ? validateProjectDetail(parsed) : [];
    const message = problems.join(" ");
    setError(message);
    onValidity?.(field.key, message);
    onChange(parsed);
  };

  return (
    <TextField
      fullWidth
      multiline
      minRows={8}
      maxRows={24}
      label={field.label}
      value={text}
      placeholder={placeholder ? "Leave empty to use the English version" : undefined}
      onChange={(e) => handle(e.target.value)}
      error={!!error}
      helperText={error || field.help}
      slotProps={{ htmlInput: { style: mono, spellCheck: false } }}
    />
  );
}

function ImageField({ field, value, onChange, onUploadImage, disabled }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await onUploadImage(file));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
        <TextField
          fullWidth
          size="small"
          label={field.label}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          helperText={error || field.help}
          error={!!error}
          disabled={disabled}
        />
        <Button variant="outlined" startIcon={<UploadIcon />} onClick={() => inputRef.current?.click()} disabled={busy || disabled} sx={{ whiteSpace: "nowrap", minWidth: 110 }}>
          {busy ? "Uploading…" : "Upload"}
        </Button>
        <input ref={inputRef} type="file" hidden accept="image/png,image/jpeg,image/webp,image/gif" onChange={pick} />
      </Box>
      {value ? (
        <Box component="img" src={value} alt="" sx={{ mt: 1, maxHeight: 120, maxWidth: "100%", borderRadius: 1, border: "1px solid", borderColor: "divider" }} />
      ) : null}
    </Box>
  );
}

// value shape per type: text/url/longtext/image = string, list/tags = string[], json = object
export default function FieldInput({ field, value, onChange, placeholder, onValidity, onUploadImage, disabled }) {
  switch (field.type) {
    case "longtext":
      return (
        <TextField fullWidth multiline minRows={3} label={field.label} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} helperText={field.help} disabled={disabled} required={field.required} />
      );
    case "list":
      return (
        <TextField
          fullWidth
          multiline
          minRows={4}
          label={field.label}
          value={Array.isArray(value) ? value.join("\n") : ""}
          placeholder={Array.isArray(placeholder) ? placeholder.join("\n") : undefined}
          onChange={(e) => onChange(e.target.value.split("\n"))}
          helperText={field.help}
          disabled={disabled}
        />
      );
    case "tags":
      return (
        <Autocomplete
          multiple
          size="small"
          options={field.options}
          value={Array.isArray(value) ? value : []}
          onChange={(_, next) => onChange(next)}
          disabled={disabled}
          renderTags={(tags, getTagProps) => tags.map((option, i) => <Chip variant="outlined" size="small" label={option} {...getTagProps({ index: i })} key={option} />)}
          renderInput={(params) => <TextField {...params} label={field.label} helperText={field.help} />}
        />
      );
    case "image":
      return <ImageField field={field} value={value} onChange={onChange} onUploadImage={onUploadImage} disabled={disabled} />;
    case "json":
      return <JsonField field={field} value={value} onChange={onChange} onValidity={onValidity} placeholder={placeholder} />;
    default:
      return (
        <TextField fullWidth size="small" label={field.label} value={value ?? ""} placeholder={typeof placeholder === "string" ? placeholder : undefined} onChange={(e) => onChange(e.target.value)} helperText={field.help} disabled={disabled} required={field.required} />
      );
  }
}
