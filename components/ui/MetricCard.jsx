"use client";

import { BADGE_COLORS } from "@/constants/theme";

export function MetricCard({ icon: Icon, label, value, badge, badgeType = "green" }) {
  const { bg, fg } = BADGE_COLORS[badgeType];
  return (
    <div style={{ background: "#F8F9FB", borderRadius: 10, padding: "14px 16px", border: "0.5px solid #E5E7EB" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
        <Icon size={14} strokeWidth={1.8} />
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 600, color: "#111827", lineHeight: 1 }}>{value}</div>
      {badge && (
        <div style={{ marginTop: 8, display: "inline-block", fontSize: 11, padding: "2px 9px", borderRadius: 99, background: bg, color: fg, fontWeight: 500 }}>
          {badge}
        </div>
      )}
    </div>
  );
}
