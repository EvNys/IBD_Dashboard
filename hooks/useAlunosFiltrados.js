// Sem "use client" — a diretiva deve ficar no componente que usa o hook, não no hook em si.
import { useState, useMemo, useEffect } from "react";
import { ALUNOS } from "@/data/alunos";
import { PER_PAGE } from "@/constants/theme";

export function useAlunosFiltrados() {
  const [query,  setQuery]  = useState("");
  const [filPcd, setFilPcd] = useState(false);
  const [filBs,  setFilBs]  = useState(false);
  const [page,   setPage]   = useState(1);

  useEffect(() => setPage(1), [query, filPcd, filBs]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return ALUNOS.filter((a) => {
      const matchQ   = !q || a.nome.toLowerCase().includes(q) || a.email.includes(q) || a.telefone.includes(q);
      const matchPcd = !filPcd || a.pcd;
      const matchBs  = !filBs  || a.bs;
      return matchQ && matchPcd && matchBs;
    });
  }, [query, filPcd, filBs]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const slice      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const start      = Math.min((page - 1) * PER_PAGE + 1, filtered.length);
  const end        = Math.min(page * PER_PAGE, filtered.length);

  return {
    query, setQuery,
    filPcd, setFilPcd,
    filBs,  setFilBs,
    page, setPage, totalPages,
    filtered, slice, start, end,
  };
}
