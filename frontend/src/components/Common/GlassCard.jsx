import { Card } from "@mui/material";

function GlassCard({ children, sx = {} }) {
  return (
    <Card
      sx={{
        background: "rgba(255,255,255,0.05)",

        backdropFilter: "blur(18px)",

        border: "1px solid rgba(255,255,255,.08)",

        borderRadius: 4,

        transition: "all .35s ease",

        boxShadow:
          "0 10px 35px rgba(0,0,0,.25)",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            "0 18px 45px rgba(37,99,235,.35)",
          border:
            "1px solid rgba(59,130,246,.35)",
        },

        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

export default GlassCard;