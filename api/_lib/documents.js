// Turns uploaded files into Claude message content blocks.
// Never silently truncates: if the material is too large it fails with a clear
// message so the owner can split it up.

import mammoth from "mammoth";

export class UserError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

export const LIMITS = {
  files: 8,
  perFileBytes: 10 * 1024 * 1024,
  totalBytes: 25 * 1024 * 1024,
  textChars: 1_500_000,
};

const TEXT_EXTENSIONS = new Set(["txt", "md", "markdown", "json", "csv", "tsv", "html", "htm", "xml", "yml", "yaml", "log"]);
const IMAGE_TYPES = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif" };

const extOf = (name) => (String(name).split(".").pop() || "").toLowerCase();

// files: [{ name: string, buffer: Buffer }]
// Returns { blocks, notes } where blocks are ready for a user message.
export async function toContentBlocks(files) {
  if (files.length > LIMITS.files) throw new UserError(`Please attach at most ${LIMITS.files} files.`);
  const total = files.reduce((n, f) => n + f.buffer.length, 0);
  if (total > LIMITS.totalBytes) throw new UserError("The attached files are too large in total (25 MB max).", 413);

  const blocks = [];
  const notes = [];
  let textChars = 0;

  for (const { name, buffer } of files) {
    if (buffer.length > LIMITS.perFileBytes) throw new UserError(`"${name}" is larger than 10 MB.`, 413);
    const ext = extOf(name);

    if (ext === "pdf") {
      blocks.push({
        type: "document",
        title: name,
        source: { type: "base64", media_type: "application/pdf", data: buffer.toString("base64") },
      });
    } else if (IMAGE_TYPES[ext]) {
      blocks.push({ type: "text", text: `Image attached: ${name}` });
      blocks.push({ type: "image", source: { type: "base64", media_type: IMAGE_TYPES[ext], data: buffer.toString("base64") } });
    } else if (ext === "docx") {
      let text;
      try {
        text = (await mammoth.extractRawText({ buffer })).value;
      } catch {
        throw new UserError(`"${name}" could not be read as a Word document.`);
      }
      notes.push(`Only the text of "${name}" was read; images and charts inside it were not.`);
      textChars += text.length;
      blocks.push({ type: "text", text: wrap(name, text) });
    } else if (ext === "doc") {
      throw new UserError(`"${name}" is an old .doc file. Please save it as .docx or PDF and upload that.`);
    } else if (TEXT_EXTENSIONS.has(ext)) {
      const text = buffer.toString("utf8");
      textChars += text.length;
      blocks.push({ type: "text", text: wrap(name, text) });
    } else {
      throw new UserError(`"${name}" is not a supported file type. Use PDF, DOCX, images, or text/JSON/CSV/Markdown.`);
    }
  }

  if (textChars > LIMITS.textChars) {
    throw new UserError("The text in these documents is too long to process in one go. Please attach fewer or smaller files.", 413);
  }
  return { blocks, notes };
}

// Delimit each document so the model can tell data from instructions.
function wrap(name, text) {
  return `<document name="${String(name).replace(/"/g, "'")}">\n${text}\n</document>`;
}
