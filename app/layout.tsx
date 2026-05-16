import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mapa de Calor — Portonazos y Encerronas RM",
  description: "Mapa interactivo de portonazos y encerronas en la Región Metropolitana de Santiago. Datos PDI y Fiscalía Oriente 2024-2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
