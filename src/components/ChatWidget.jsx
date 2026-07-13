import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Fab,
  Paper,
  Typography,
  IconButton,
  TextField,
  CircularProgress,
  Slide,
  Avatar,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";

export default function ChatWidget() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: t("chat.greeting") }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Keep the greeting in sync with the language switcher, but only while the
  // visitor hasn't started chatting yet — don't clobber an active conversation.
  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0].role === "assistant"
        ? [{ role: "assistant", content: t("chat.greeting") }]
        : prev
    );
  }, [i18n.language, t]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          // send prior turns (excluding the greeting) so the bot has context
          history: newMessages.slice(1, -1),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t("chat.genericError"));
        setMessages((prev) => prev.slice(0, -1)); // roll back optimistic user message on hard failure
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(t("chat.networkError"));
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1300 }}>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={6}
          sx={{
            width: 340,
            height: 460,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
            mb: 2,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              bgcolor: "primary.main",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: "primary.dark", fontSize: 14 }}>
                AI
              </Avatar>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                {t("chat.assistantName")}
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            ref={scrollRef}
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 1.5,
              py: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              bgcolor: "background.default",
            }}
          >
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                <Paper
                  variant={msg.role === "user" ? "elevation" : "outlined"}
                  elevation={msg.role === "user" ? 1 : 0}
                  sx={{
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: msg.role === "user" ? "primary.main" : "background.paper",
                    color: msg.role === "user" ? "#fff" : "text.primary",
                  }}
                >
                  <Typography variant="body2">{msg.content}</Typography>
                </Paper>
              </Box>
            ))}

            {loading && (
              <Box sx={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 1, px: 1 }}>
                <CircularProgress size={14} />
                <Typography variant="caption" color="text.secondary">
                  {t("chat.thinking")}
                </Typography>
              </Box>
            )}

            {error && (
              <Typography variant="caption" color="error" sx={{ px: 1 }}>
                {error}
              </Typography>
            )}
          </Box>

          {/* Input */}
          <Box sx={{ p: 1.5, borderTop: 1, borderColor: "divider", display: "flex", gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder={t("chat.placeholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              inputProps={{ maxLength: 500 }}
            />
            <IconButton
              color="primary"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label={t("chat.sendAria")}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      </Slide>

      <Fab
        color="primary"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? t("chat.closeAria") : t("chat.openAria")}
      >
        {open ? <CloseIcon /> : <ChatBubbleOutlineIcon />}
      </Fab>
    </Box>
  );
}