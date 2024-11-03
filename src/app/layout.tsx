import type { Metadata } from "next";
import { CssBaseline } from "@mui/material";
import "@styles/main.scss";
import { PublicEnvProvider } from "next-runtime-env";
import { BlocksProvider } from "@src/context/BlocksContext";
import { ThemeContextProvider } from "@src/context/ThemeContext";

export const metadata: Metadata = {
  title: "EtherRewards",
  description:
    "Sigue las recompensas de bloques de Ethereum en USD a lo largo del tiempo. Gráficos interactivos y análisis de tendencias al alcance de tu mano.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* FAVICON SVG */}
        <link
          rel="shortcut icon"
          href="./eth-isologo.svg"
          type="image/svg+xml"
        />
      </head>
      <body>
        <CssBaseline />
        <PublicEnvProvider>
          <ThemeContextProvider>
            <BlocksProvider>{children}</BlocksProvider>
          </ThemeContextProvider>
        </PublicEnvProvider>
      </body>
    </html>
  );
};

export default Layout;
