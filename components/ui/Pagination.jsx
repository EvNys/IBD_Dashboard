"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { C } from "@/constants/theme";

export function Pagination({ page, totalPages, start, end, total, onPrev, onNext }) {
  const base = {
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
          style={{ ...base, cursor: page === 1 ? "not-allowed" : "pointer", color: page === 1 ? "#D1D5DB" : "#6B7280" }}>
          <ChevronLeft size={14} />
        </button>
        <button style={{ ...base, border: "none", background: C.blue, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "default" }}>
          {page}
        </button>
        <button onClick={onNext} disabled={page === totalPages} aria-label="Próxima página"
          style={{ ...base, cursor: page === totalPages ? "not-allowed" : "pointer", color: page === totalPages ? "#D1D5DB" : "#6B7280" }}>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
