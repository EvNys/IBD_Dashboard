"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AVATAR_COLORS, BADGE_COLORS, C } from "@/constants/theme";

// ─── Helpers ────────────────────────────────────────────────────────────────
export const initials    = (name) => name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
export const avatarColor = (id)   => AVATAR_COLORS[id % AVATAR_COLORS.length];

// ─── Avatar ──────────────────────────────────────────────────────────────────
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

// ─── Badge ───────────────────────────────────────────────────────────────────
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

// ─── MetricCard ───────────────────────────────────────────────────────────────
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

// ─── ChartCard ────────────────────────────────────────────────────────────────
export function ChartCard({ title, sub, children, legend }) {
  return (
    <div style={{ background: "#fff", border: "0.5px solid #E5E7EB", borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{title}</div>
      <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 10, marginTop: 2 }}>{sub}</div>
      {legend && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 10 }}>
          {legend.map((l) => (
            <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#6B7280" }}>
              <span style={{ width: 8, height: 8, borderRadius: l.round ? 99 : 2, background: l.color, flexShrink: 0 }} />
              {l.label}
            </span>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

// ─── CustomTooltip (Recharts) ────────────────────────────────────────────────
export function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff", border: "0.5px solid #E5E7EB", borderRadius: 8,
      padding: "8px 12px", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,.08)",
    }}>
      <div style={{ fontWeight: 600, marginBottom: 4, color: "#111827" }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color, display: "flex", gap: 8 }}>
          <span>{p.name}:</span>
          <span style={{ fontWeight: 600 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export function Pagination({ page, totalPages, start, end, total, onPrev, onNext }) {
  const btnBase = {
    width: 28, height: 28, borderRadius: 7, border: "0.5px solid #E5E7EB",
    background: "transparent", display: "flex", alignItems: "center", justifyContent: "center",
  };
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 16px", borderTop: "0.5px solid #E5E7EB", fontSize: 12, color: "#9CA3AF",
    }}>
      <span>Mostrando {start}–{end} de {total}</span>
      <div style={{ display: "flex", gap: 4 }}>
        <button onClick={onPrev} disabled={page === 1} aria-label="Página anterior"
          style={{ ...btnBase, cursor: page === 1 ? "not-allowed" : "pointer", color: page === 1 ? "#D1D5DB" : "#6B7280" }}>
          <ChevronLeft size={14} />
        </button>
        <button style={{ ...btnBase, border: "none", background: C.blue, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "default" }}>
          {page}
        </button>
        <button onClick={onNext} disabled={page === totalPages} aria-label="Próxima página"
          style={{ ...btnBase, cursor: page === totalPages ? "not-allowed" : "pointer", color: page === totalPages ? "#D1D5DB" : "#6B7280" }}>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
