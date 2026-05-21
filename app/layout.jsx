import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "EduAdmin — Painel Administrativo",
  description: "Gestão de alunos para instituições de ensino",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={dmSans.className}>
      <body>{children}</body>
    </html>
  );
}
