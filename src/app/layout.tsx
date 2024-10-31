import type { Metadata } from "next";
import { CssBaseline } from "@mui/material";
import "@styles/main.scss";
import { PublicEnvProvider } from "next-runtime-env";
import { BlocksProvider } from "@src/context/BlocksContext";

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
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <CssBaseline />
        <PublicEnvProvider>
          <BlocksProvider>{children}</BlocksProvider>
        </PublicEnvProvider>
      </body>
    </html>
  );
}
