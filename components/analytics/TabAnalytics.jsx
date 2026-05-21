"use client";

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Users, Accessibility, HeartHandshake, Clock } from "lucide-react";

import { C } from "@/constants/theme";
import { MetricCard } from "@/components/ui/MetricCard";
import { ChartCard, CustomTooltip } from "@/components/ui/ChartCard";
import { dataGenero, dataRenda, dataLinha, dataIdade } from "@/data/analytics";

function MetricsRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
      <MetricCard icon={Users}          label="Total de Alunos"  value="247" badge="+18 este mês"   badgeType="green" />
      <MetricCard icon={Accessibility} label="Alunos PCD"       value="31"  badge="12,6% do total" badgeType="amber" />
      <MetricCard icon={HeartHandshake} label="Benefício Social" value="89"  badge="36,0% do total" badgeType="green" />
      <MetricCard icon={Clock}          label="Novos (30 dias)"  value="18"  badge="−3 vs mês ant." badgeType="red"   />
    </div>
  );
}

function GeneroChart() {
  return (
    <ChartCard title="Proporção de Gênero" sub="Identidade autodeclarada"
      legend={dataGenero.map((d) => ({ label: `${d.name} ${d.value}%`, color: d.color }))}>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={dataGenero} cx="50%" cy="50%" innerRadius={52} outerRadius={80} dataKey="value" paddingAngle={3}>
            {dataGenero.map((d) => <Cell key={d.name} fill={d.color} />)}
          </Pie>
          <Tooltip formatter={(v) => `${v}%`} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function RendaChart() {
  return (
    <ChartCard title="Faixa de Renda Familiar" sub="Por salário mínimo"
      legend={[{ label: "Alunos", color: C.blue }]}>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={dataRenda} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
  return (
    <ChartCard title="Evolução de Atendimento" sub="Alunos ativos por mês — 2024/2025"
      legend={[{ label: "Ativos", color: C.blue, round: true }, { label: "Novos", color: C.teal, round: true }]}>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={dataLinha} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
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
  return (
    <ChartCard title="Faixa Etária" sub="Distribuição por grupos de idade e gênero"
      legend={[{ label: "Feminino", color: C.blue }, { label: "Masculino", color: C.coral }, { label: "Outro", color: C.teal }]}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={dataIdade} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="faixa" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Feminino"  fill={C.blue}  radius={[3, 3, 0, 0]} />
          <Bar dataKey="Masculino" fill={C.coral} radius={[3, 3, 0, 0]} />
          <Bar dataKey="Outro"     fill={C.teal}  radius={[3, 3, 0, 0]} />
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
