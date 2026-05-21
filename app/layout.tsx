import type { Metadata } from "next";
import "./globals.css";
import { GastoProvider } from "./context/gastoContext";

export const metadata: Metadata = {
  title: "Mis Gastos",
  description: "Administrador de gastos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <GastoProvider>
          {children}
        </GastoProvider>
      </body>
    </html>
  );
}