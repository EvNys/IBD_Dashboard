// Cores inline — evita importar theme.js aqui e criar dependência circular no grafo do Next.js
export const dataGenero = [
  { name: "Feminino",  value: 52, color: "#1D9E75" },
  { name: "Masculino", value: 38, color: "#1D4ED8" },
  { name: "Outro",     value: 10, color: "#D85A30" },
];

export const dataRenda = [
  { label: "< 1 SM", alunos: 28 },
  { label: "1 SM",   alunos: 54 },
  { label: "1–2 SM", alunos: 72 },
  { label: "2–3 SM", alunos: 48 },
  { label: "3–5 SM", alunos: 31 },
  { label: "> 5 SM", alunos: 14 },
];

export const dataLinha = [
  { mes:"Jan", ativos:180, novos:12 },
  { mes:"Fev", ativos:188, novos:8  },
  { mes:"Mar", ativos:193, novos:5  },
  { mes:"Abr", ativos:200, novos:7  },
  { mes:"Mai", ativos:208, novos:8  },
  { mes:"Jun", ativos:212, novos:4  },
  { mes:"Jul", ativos:220, novos:8  },
  { mes:"Ago", ativos:225, novos:5  },
  { mes:"Set", ativos:231, novos:6  },
  { mes:"Out", ativos:238, novos:7  },
  { mes:"Nov", ativos:243, novos:5  },
  { mes:"Dez", ativos:247, novos:4  },
];

export const dataIdade = [
  { faixa:"14–17", Feminino:12, Masculino:8,  Outro:2 },
  { faixa:"18–24", Feminino:42, Masculino:31, Outro:8 },
  { faixa:"25–30", Feminino:38, Masculino:29, Outro:6 },
  { faixa:"31–39", Feminino:22, Masculino:16, Outro:4 },
  { faixa:"40–49", Feminino:10, Masculino:8,  Outro:2 },
  { faixa:"50+",   Feminino:5,  Masculino:2,  Outro:1 },
];
