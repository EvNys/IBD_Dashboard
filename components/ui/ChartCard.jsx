"use client";

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
