import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EtherRewards",
  description:
    "Sigue las recompensas de bloques de Ethereum en USD a lo largo del tiempo. Gráficos interactivos y análisis de tendencias al alcance de tu mano.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
