"use client";
import { Button } from "@mui/material";
import Hero from "@src/components/Hero";
import Link from "next/link";

const Error = () => {
  return (
    <main>
      <Hero />
      <div className="container">
        <h1 style={{ textAlign: "center", fontSize: 60, margin: "50px 0" }}>
          Lo sentimos...
        </h1>
        <p style={{ textAlign: "center", fontSize: 24 }}>
          Hubo un error al cargar la página
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

export default Error;
