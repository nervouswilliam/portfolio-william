import { Box } from "@mui/material";

export default function Section({ id, children, bgColor }) {
  return (
    <Box
      id={id.toLowerCase()}
      sx={{
        minHeight: "100vh",
        padding: "100px 20px",
        backgroundColor: bgColor || "inherit",
        scrollMarginTop: "80px",
      }}
    >
      {children}
    </Box>
  );
}
