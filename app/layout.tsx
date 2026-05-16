import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mapa de Calor — Portonazos y Encerronas RM",
  description: "Mapa interactivo de portonazos y encerronas en la Región Metropolitana de Santiago. Datos PDI y Fiscalía Oriente 2024-2025.",
};

// Viewport export separado — única forma correcta en Next.js 14 de bloquear zoom
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
