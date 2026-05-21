"use client";

import { AVATAR_COLORS } from "@/constants/theme";

const initials    = (name) => name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
const avatarColor = (id)   => AVATAR_COLORS[id % AVATAR_COLORS.length];

export function Avatar({ name, id, size = 28 }) {
  const { bg, fg } = avatarColor(id);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.4, fontWeight: 600, color: fg, flexShrink: 0,
    }}>
      {initials(name)}
    </div>
  );
}
