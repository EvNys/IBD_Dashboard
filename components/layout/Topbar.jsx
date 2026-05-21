"use client";

import { School, Users, SlidersHorizontal } from "lucide-react";
import { C } from "@/constants/theme";

const NAV_ITEMS = [
  { key: "analytics", label: "Analytics", Icon: SlidersHorizontal },
  { key: "alunos",    label: "Alunos",    Icon: Users             },
];

export function Topbar({ activeTab, onTabChange }) {
  return (
    <header style={{
      background: "#fff", borderBottom: "0.5px solid #E5E7EB",
      padding: "0 24px", display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 56,
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <School size={18} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", lineHeight: 1.2 }}>EduAdmin</div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>Painel Administrativo — Gestão de Alunos</div>
        </div>
      </div>

      <nav style={{ display: "flex", gap: 2, background: "#F3F4F6", padding: 3, borderRadius: 10, border: "0.5px solid #E5E7EB" }}>
        {NAV_ITEMS.map(({ key, label, Icon }) => {
          const active = activeTab === key;
          return (
            <button key={key} onClick={() => onTabChange(key)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 16px", fontSize: 13, borderRadius: 8, cursor: "pointer",
              border:      active ? "0.5px solid #E5E7EB" : "none",
              background:  active ? "#fff" : "transparent",
              color:       active ? "#111827" : "#6B7280",
              fontWeight:  active ? 600 : 400,
              transition: "all .15s",
            }}>
              <Icon size={14} strokeWidth={1.8} />
              {label}
            </button>
          );
        })}
      </nav>
    </header>
  );
  
}
export default Topbar;
