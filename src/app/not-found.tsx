import { Button } from "@mui/material";
import Hero from "@src/components/Hero";
import Link from "next/link";

const NotFound = async () => {
  return (
    <main>
      <Hero />
      <div className="container">
        <h1 style={{ textAlign: "center", fontSize: 160, margin: "50px 0" }}>
          404
        </h1>
        <p style={{ textAlign: "center", fontSize: 24 }}>
          La página que buscas no existe
        </p>
        <Link href="/">
          <Button
            variant="contained"
            color="primary"
            sx={{ display: "block", margin: "0 auto" }}
          >
            IR AL INICIO
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
