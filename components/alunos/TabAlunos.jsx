"use client";

import { Search, Eye, Accessibility, HeartHandshake } from "lucide-react";
import { C } from "@/constants/theme";
import { Avatar }  from "@/components/ui/Avatar";
import { Badge }  from "@/components/ui/Badge";
import { Pagination }  from "@/components/ui/Pagination";
import useDadosBanco from "@/hooks/useDadosBanco";
import React, { useState, useEffect} from "react";

function FilterButton({ active, onClick, icon: Icon, label }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "6px 14px", fontSize: 12, fontWeight: 500,
      cursor: "pointer", borderRadius: 8,
      border:      active ? `1.5px solid ${C.blue}` : "0.5px solid #E5E7EB",
      background:  active ? C.blueL : "transparent",
      color:       active ? C.blueD : "#6B7280",
      transition: "all .15s",
    }}>
      <Icon size={14} strokeWidth={1.8} />
      {label}
    </button>
  );
}

function formatTelefone(tel) {
  if (!tel) return "—";
  const numeros = tel.replace(/\D/g, "");
  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }
  return tel;
}

export function TabAlunos({ onOpen }) {

function AlunoRow({ aluno, onOpen }) {
  return (
    <tr
      onClick={() => onOpen(aluno)}
      style={{ borderBottom: "0.5px solid #F3F4F6", cursor: "pointer", transition: "background .1s" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <td style={{ padding: "11px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Avatar name={aluno.nome} id={aluno.id} />
          <span style={{ color: "#111827" }}>{aluno.nome}</span>
        </div>
      </td>
      <td style={{ padding: "11px 14px", color: "#6B7280" }}>{aluno.email}</td>
      <td style={{ padding: "11px 14px", color: "#6B7280" }}>{formatTelefone(aluno.telefone)}</td>
      <td style={{ padding: "11px 14px" }}>
        {aluno.ePcd === "Sim" && <Badge label="PCD"    type="amber" style={{ marginRight: 4 }} />}
        {aluno.recebeBeneficio === "Sim"  && <Badge label="Benef." type="green" />}
      </td>
      <td style={{ padding: "11px 14px" }}>
        <button
          onClick={(e) => { e.stopPropagation(); onOpen(aluno); }}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "5px 11px", fontSize: 12, fontWeight: 500,
            cursor: "pointer", borderRadius: 7,
            border: "0.5px solid #E5E7EB", background: "transparent", color: "#6B7280",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <Eye size={13} strokeWidth={1.8} /> Ver
        </button>
      </td>
    </tr>
  );
}

  const { dados, loading, error } = useDadosBanco();
  // Filtros e busca locais
  const [query, setQuery] = React.useState("");
  const [filPcd, setFilPcd] = React.useState(false);
  const [filBs, setFilBs] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  // Filtragem
  const filtered = React.useMemo(() => {
    if (!Array.isArray(dados)) return [];
    return dados.filter(a => {
      const matchQuery = query === "" ||
        (a.nome && a.nome.toLowerCase().includes(query.toLowerCase())) ||
        (a.email && a.email.toLowerCase().includes(query.toLowerCase())) ||
        (a.telefone && a.telefone.toLowerCase().includes(query.toLowerCase()));
      const matchPcd = !filPcd || a.ePcd === "Sim";
      const matchBs = !filBs || a.recebeBeneficio === "Sim";
      return matchQuery && matchPcd && matchBs;
    });
  }, [dados, query, filPcd, filBs]);

  // Paginação
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, filtered.length);
  const slice = filtered.slice(start - 1, end);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;
  if (!Array.isArray(dados)) return <div>Dados inválidos recebidos da API</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>
          Gestão de Alunos{" "}
          <span style={{ fontSize: 12, fontWeight: 400, color: "#9CA3AF", marginLeft: 6 }}>
            {filtered.length} registro{filtered.length !== 1 ? "s" : ""}
          </span>
        </h2>
      </div>

      <div style={{ background: "#fff", border: "0.5px solid #E5E7EB", borderRadius: 12, overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #E5E7EB", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={14} strokeWidth={1.8} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome, e-mail ou telefone..."
              style={{ width: "100%", paddingLeft: 32, paddingRight: 12, height: 36, fontSize: 13, borderRadius: 8, border: "0.5px solid #E5E7EB", outline: "none", background: "#F9FAFB", color: "#111827" }}
            />
          </div>
          <FilterButton active={filPcd} onClick={() => setFilPcd(!filPcd)} icon={Accessibility} label="PCD" />
          <FilterButton active={filBs}  onClick={() => setFilBs(!filBs)}   icon={HeartHandshake} label="Benefício Social" />
        </div>

        {/* Tabela */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                {["Nome Completo","E-mail","Telefone","Marcadores","Ações"].map((h, i) => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9CA3AF", background: "#F9FAFB", borderBottom: "0.5px solid #E5E7EB", textTransform: "uppercase", letterSpacing: ".04em", width: i === 4 ? 90 : "auto" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slice.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "32px 14px", textAlign: "center", color: "#9CA3AF", fontSize: 13 }}>
                    Nenhum aluno encontrado para os filtros aplicados.
                  </td>
                </tr>
              ) : (
                slice.map((a) => <AlunoRow key={a.id} aluno={a} onOpen={onOpen} />)
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page} totalPages={totalPages} start={start} end={end} total={filtered.length}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        />
      </div>
    </div>
  );
}
