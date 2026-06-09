"use client";

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Users, Accessibility, HeartHandshake, Clock } from "lucide-react";
import useDadosBanco from "@/hooks/useDadosBanco";
import { C } from "@/constants/theme";
import { MetricCard } from "@/components/ui/MetricCard";
import { ChartCard, CustomTooltip } from "@/components/ui/ChartCard";


function MetricsRow() {
  const { dados, loading, error } = useDadosBanco();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;
  if (!Array.isArray(dados)) return <div>Dados inválidos recebidos da API</div>;

  // Ajuste os campos conforme o banco
  const totalAlunos = dados.length;
  const totalPCD = dados.filter(d => d.ePcd === "Sim").length;
  const totalBeneficio = dados.filter(d => d.recebeBeneficio === "Sim").length;

  // Novos alunos nos últimos 30 dias
  const hoje = new Date();
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(hoje.getDate() - 30);
  const novos = dados.filter(d => {
    if (!d.criadoEm) return false;
    const dt = new Date(d.criadoEm);
    return dt >= trintaDiasAtras && dt <= hoje;
  }).length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
      <MetricCard icon={Users} label="Total de Alunos" value={totalAlunos} badge={`+${novos} este mês`} badgeType="green" />
      <MetricCard icon={Accessibility} label="Alunos PCD" value={totalPCD} badge={`${((totalPCD/totalAlunos)*100).toFixed(1)}% do total`} badgeType="amber" />
      <MetricCard icon={HeartHandshake} label="Benefício Social" value={totalBeneficio} badge={`${((totalBeneficio/totalAlunos)*100).toFixed(1)}% do total`} badgeType="green" />
      <MetricCard icon={Clock} label="AlunosNovos (30 dias)" value={novos} badge={``} badgeType="red" />
    </div>
  );
}

function GeneroChart() {
  const { dados, loading, error } = useDadosBanco();

  
  const data = Array.isArray(dados) && dados.length > 0 ? [
    { name: "Feminino", value: dados.filter(d => d.identidadeDeGenero === 'MULHER (gênero de nascimento)').length, color: "#f095d7", fill: "#f095d7" },
    { name: "Masculino", value: dados.filter(d => d.identidadeDeGenero === 'HOMEM (gênero de nascimento)').length, color: "#1D4ED8", fill: "#1D4ED8" },
    { name: "Outro", value: dados.filter(d => d.identidadeDeGenero !== 'MULHER (gênero de nascimento)' && d.identidadeDeGenero !== 'HOMEM (gênero de nascimento)').length, color: "#D85A30", fill: "#D85A30" },
  ] : [];

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;

  return (
    <ChartCard title="Proporção de Gênero" sub="Identidade autodeclarada"
      legend={data.map((d) => ({ label: `${d.name} ${d.value}`, color: d.color }))}>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={80} dataKey="value" paddingAngle={3} />
          <Tooltip formatter={(v) => `${v}`} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function RendaChart() {
  const { dados, loading, error } = useDadosBanco();

  const faixas = [
    { label: "< 1 SM", test: (v) => v === "ABAIXO DE 1 SALÁRIO MÍNIMO"},
    { label: "1–3 SM", test: (v) => v === "Entre 1 E 3 SALÁRIO MÍNIMOS"},
    { label: "> 3 SM", test: (v) => v === "ACIMA DE 3 SALÁRIOS MÍNIMOS"}
  ];

  let data = [];
  if (Array.isArray(dados)) {
    data = faixas.map(faixa => ({
      label: faixa.label,
      alunos: dados.filter(d => faixa.test(d.rendaTotal)).length
    }));
  }

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;
  if (!Array.isArray(dados)) return <div>Dados inválidos recebidos da API</div>;

  return (
    <ChartCard title="Faixa de Renda Familiar" sub="Por salário mínimo"
      legend={[{ label: "Alunos", color: C.blue }]}> 
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="alunos" name="Alunos" fill={C.blue} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function LinhaChart() {
  const { dados, loading, error } = useDadosBanco();

  // Espera-se que cada aluno tenha um campo de data de matrícula, ex: 'dataMatricula'
  // Adapte o nome do campo conforme o banco
  let data = [];
  if (Array.isArray(dados)) {
    // Agrupa por mês/ano
    const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    const agrupado = {};
    dados.forEach(d => {
      if (!d.criadoEm) return;
      const dt = new Date(d.criadoEm);
      if (isNaN(dt)) return;
      const chave = `${meses[dt.getMonth()]}/${dt.getFullYear()}`;
      if (!agrupado[chave]) agrupado[chave] = { mes: chave, novos: 0, ativos: 0 };
      agrupado[chave].novos++;
    });
    // Para cada mês, calcula ativos acumulados
    let acumulado = 0;
    data = Object.values(agrupado)
      .sort((a, b) => {
        const [mA, yA] = a.mes.split("/");
        const [mB, yB] = b.mes.split("/");
        return Number(yA) - Number(yB) || meses.indexOf(mA) - meses.indexOf(mB);
      })
      .map((item) => {
        acumulado += item.novos;
        return { ...item, ativos: acumulado };
      });
  }

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;
  if (!Array.isArray(dados)) return <div>Dados inválidos recebidos da API</div>;

  return (
    <ChartCard title="Evolução de Atendimento" sub="Alunos ativos por mês"
      legend={[{ label: "Ativos", color: C.blue, round: true }, { label: "Novos", color: C.teal, round: true }]}> 
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="ativos" name="Ativos" stroke={C.blue} strokeWidth={2} dot={{ r: 3, fill: C.blue }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="novos"  name="Novos"  stroke={C.teal} strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3, fill: C.teal }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function IdadeChart() {
  const { dados, loading, error } = useDadosBanco();

  const faixas = [
    { faixa: "14–17", min: 14, max: 17 },
    { faixa: "18–24", min: 18, max: 24 },
    { faixa: "25–30", min: 25, max: 30 },
    { faixa: "31–39", min: 31, max: 39 },
    { faixa: "40–49", min: 40, max: 49 },
    { faixa: "50+",   min: 50, max: 200 },
  ];

  let data = [];
  if (Array.isArray(dados)) {
    const anoAtual = new Date().getFullYear();
    data = faixas.map(faixa => {
      const total = dados.filter(d => {
        if (!d["dataNasc"]) return false;
        const anoNasc = new Date(d["dataNasc"]).getFullYear();
        if (isNaN(anoNasc)) return false;
        const idade = anoAtual - anoNasc;
        return idade >= faixa.min && idade <= faixa.max;
      }).length;
      return {
        faixa: faixa.faixa,
        alunos: total,
      };
    });
  }

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;
  if (!Array.isArray(dados)) return <div>Dados inválidos recebidos da API</div>;

  return (
    <ChartCard title="Faixa Etária" sub="Distribuição por grupos de idade"
      legend={[{ label: "Alunos", color: C.blue }]}> 
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="faixa" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="alunos" fill="#3ec964" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function TabAnalytics() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <MetricsRow />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 14 }}>
        <GeneroChart />
        <RendaChart  />
        <LinhaChart  />
      </div>
      <IdadeChart />
    </div>
  );
}
