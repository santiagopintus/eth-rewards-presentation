import type { Metadata } from "next";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import "@styles/main.scss";

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
        {children}
      </body>
    </html>
  );
}
