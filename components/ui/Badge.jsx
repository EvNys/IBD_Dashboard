"use client";

import { BADGE_COLORS } from "@/constants/theme";

export function Badge({ label, type = "green", style: extra = {} }) {
  const { bg, fg } = BADGE_COLORS[type] ?? BADGE_COLORS.green;
  return (
    <span style={{
      fontSize: 10, padding: "2px 8px", borderRadius: 99,
      background: bg, color: fg, fontWeight: 600, ...extra,
    }}>
      {label}
    </span>
  );
}
