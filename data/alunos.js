// Arquivo JS puro sem imports — pode ser consumido por Server e Client Components

const NOMES = [
  "Ana Carla Silva","Bruno Mendes","Carla Souza","Diego Ferreira",
  "Elaine Costa","Fernanda Lima","Gabriel Santos","Helena Alves",
  "Igor Rocha","Juliana Nunes","Kaue Oliveira","Larissa Melo",
  "Marcos Viana","Natália Pires","Otávio Cruz","Priscila Ramos",
  "Quezia Barros","Rafael Teles","Sabrina Lopes","Thiago Pereira",
  "Ursula Campos","Vitor Marques","Wanessa Brito","Xavier Figueiredo",
  "Yara Monteiro","Zelia Cavalcanti","Adilson Freitas","Beatriz Cunha",
  "Carlos Duarte","Débora Cardoso",
];
const BENEFICIOS  = ["Bolsa Família","BPC","Auxílio Brasil","CadÚnico"];
const RACAS       = ["Parda","Preta","Branca","Indígena","Amarela"];
const GENERO_ID   = ["Mulher cisgênero","Homem cisgênero","Não-binário","Mulher trans","Homem trans"];
const BAIRROS     = ["Messejana","Aldeota","Parangaba","Benfica","Mondubim","Maraponga","Jóquei Clube"];
const RUAS        = ["das Flores","do Sol","da Paz","XV de Novembro"];
const PROBLEMAS   = ["Nenhum","Hipertensão","Diabetes","Ansiedade","Depressão","Epilepsia"];
const RESTRICOES  = ["Nenhuma","Lactose","Glúten","Frutos do mar","Amendoim"];
const EMPREGOS    = ["Empregado(a)","Desempregado(a)","Autônomo(a)","Estudante","Aposentado(a)"];
const CIDADES_NAT = ["Fortaleza/CE","Sobral/CE","Caucaia/CE","Maracanaú/CE","Juazeiro/CE"];
const DEFIC       = ["Visual","Auditiva","Motora","Intelectual","Múltipla"];
const FONES_PRE   = ["(85) 99201-","(85) 98712-","(85) 99534-","(85) 97632-","(85) 99801-"];

// PRNG determinístico (seed=42) — mesmos dados no SSR e na hidratação
let _s = 42;
const srnd  = (arr) => { _s = (_s * 1664525 + 1013904223) & 0x7fffffff; return arr[_s % arr.length]; };
const srndN = (a, b) => { _s = (_s * 1664525 + 1013904223) & 0x7fffffff; return a + (_s % (b - a + 1)); };
const sProb = (p)    => { _s = (_s * 1664525 + 1013904223) & 0x7fffffff; return (_s % 1000) / 1000 < p; };

export const ALUNOS = Array.from({ length: 247 }, (_, i) => {
  const nm  = NOMES[i % NOMES.length] + (i >= NOMES.length ? ` ${Math.floor(i / NOMES.length) + 1}` : "");
  const pcd = sProb(0.126);
  const bs  = sProb(0.36);
  return {
    id: i + 1,
    nome: nm,
    email: nm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,".") + "@gmail.com",
    telefone: srnd(FONES_PRE) + (4000 + srndN(0, 5999)),
    cpf: `${srndN(100,999)}.${srndN(100,999)}.${srndN(100,999)}-${srndN(10,99)}`,
    dataNasc: `${String(srndN(1,28)).padStart(2,"0")}/${String(srndN(1,12)).padStart(2,"0")}/${srndN(1975,2005)}`,
    naturalidade: srnd(CIDADES_NAT),
    identidadeDeGenero:    srnd(GENERO_ID),
    identifRacial:         srnd(RACAS),
    endereco: `Rua ${srnd(RUAS)}, ${srndN(10,999)} — ${srnd(BAIRROS)}, Fortaleza/CE`,
    qtdFamiliares: srndN(1, 8),
    qtdFilhos:          srndN(0, 4),
    empregabilidade:         srnd(EMPREGOS),
    qualBeneficio: bs ? srnd(BENEFICIOS) : "Nenhum",
    problemaDeSaude: srnd(PROBLEMAS),
    ePcd: pcd ? "S" : "N",
    recebeBeneficio: bs ? "S" : "N",
    qualDeficiencia: pcd ? srnd(DEFIC) : "—",
  };
});
