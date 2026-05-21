'use client';

import { useState } from "react";
import { Topbar } from "../components/layout/Topbar";
import { TabAnalytics } from "../components/analytics/TabAnalytics";
import { TabAlunos } from "@/components/alunos/TabAlunos";
import { AlunoModal } from "@/components/modal/AlunoModal";

export default function Dashboard() {
  const [tab,        setTab]        = useState("analytics");
  const [alunoModal, setAlunoModal] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#F3F4F6" }}>
      <Topbar activeTab={tab} onTabChange={setTab} />

      <main style={{ padding: "20px 24px", maxWidth: 1280, margin: "0 auto" }}>
        {tab === "analytics"
          ? <TabAnalytics />
          : <TabAlunos onOpen={setAlunoModal} />
        }
      </main>

      {alunoModal && (
        <AlunoModal aluno={alunoModal} onClose={() => setAlunoModal(null)} />
      )}
    </div>
  );
}