"use client";

import { useEffect, useRef } from "react";
import { X, AlertTriangle, IdCard, MapPin, Home } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

function Section({ icon: Icon, title, alert = false, children }) {
  return (
    <div style={{ border: "0.5px solid #E5E7EB", borderRadius: 10, overflow: "hidden" }}>
      <div style={{
        padding: "9px 14px", display: "flex", alignItems: "center", gap: 7,
        background: alert ? "#FCEBEB" : "#F8F9FB",
        fontSize: 11, fontWeight: 600,
        color: alert ? "#A32D2D" : "#6B7280",
        textTransform: "uppercase", letterSpacing: ".05em",
      }}>
        <Icon size={13} strokeWidth={2} />
        {title}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, full = false, alert = false }) {
  return (
    <div style={{ padding: "10px 14px", borderBottom: "0.5px solid #F3F4F6", gridColumn: full ? "1 / -1" : "auto" }}>
      <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13, color: alert ? "#A32D2D" : "#111827", fontWeight: alert ? 600 : 400 }}>
        {value || "—"}
      </div>
    </div>
  );
}

export function AlunoModal({ aluno, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 200, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 20px", overflowY: "auto" }}
      role="dialog" aria-modal="true" aria-labelledby="modal-title"
    >
      <div style={{ background: "#fff", borderRadius: 14, border: "0.5px solid #E5E7EB", width: "100%", maxWidth: 680, overflow: "hidden", animation: "slideUp .2s ease" }}>

        <div style={{ padding: "16px 20px", borderBottom: "0.5px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar name={aluno.nome} id={aluno.id} size={46} />
            <div>
              <div id="modal-title" style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>{aluno.nome}</div>
              <div style={{ fontSize: 13, color: "#6B7280" }}>{aluno.email}</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Fechar modal" style={{ width: 32, height: 32, borderRadius: 8, border: "0.5px solid #E5E7EB", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280" }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <Section icon={IdCard} title="Dados Pessoais">
            <Field label="CPF"                      value={aluno.cpf} />
            <Field label="Data de Nascimento"       value={aluno.nascimento} />
            <Field label="Naturalidade"             value={aluno.naturalidade} />
            <Field label="Identidade de Gênero"     value={aluno.genero_id} />
            <Field label="Autoidentificação Racial" value={aluno.raca} full />
          </Section>

          <Section icon={MapPin} title="Contato e Endereço">
            <Field label="Telefone" value={aluno.telefone} />
            <Field label="E-mail"   value={aluno.email} />
            <Field label="Endereço" value={aluno.endereco} full />
          </Section>

          <Section icon={Home} title="Contexto Familiar e Social">
            <Field label="Membros na Família"  value={`${aluno.familia_membros} pessoa${aluno.familia_membros > 1 ? "s" : ""}`} />
            <Field label="Filhos"              value={String(aluno.filhos)} />
            <Field label="Situação de Emprego" value={aluno.emprego} />
            <Field label="Benefício Social"    value={aluno.beneficio} />
          </Section>

          <Section icon={AlertTriangle} title="Saúde — Dados Sensíveis" alert>
            <Field label="Problemas de Saúde"     value={aluno.problema_saude} alert={aluno.problema_saude !== "Nenhum"} />
            <Field label="Restrições Alimentares" value={aluno.restricao}      alert={aluno.restricao !== "Nenhuma"} />
            <Field label="PCD"                    value={aluno.pcd ? "Sim" : "Não"} alert={aluno.pcd} />
            <Field label="Tipo de Deficiência"    value={aluno.deficiencia}    alert={aluno.pcd} />
          </Section>
        </div>
      </div>
    </div>
  );
}
