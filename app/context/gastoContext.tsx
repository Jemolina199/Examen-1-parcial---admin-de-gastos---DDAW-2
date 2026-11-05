"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"

export type Gasto = { idgasto: number; categoria: string; monto: string | number; fecha: string }
type NuevoGasto = { categoria: string; monto: string; fecha: string }
type GastoContextValue = {
  usuario: string | null; presupuesto: number; gastos: Gasto[]; totalGastos: number
  login: (user: string) => void
  guardarPresupuesto: (monto: number) => void
  obtenerGastos: () => Promise<void>
  agregarGasto: (gasto: NuevoGasto) => Promise<void>
}
const GastoContext = createContext<GastoContextValue | undefined>(undefined)
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "")

export function GastoProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null)
  const [presupuesto, setPresupuesto] = useState(0)
  const [gastos, setGastos] = useState<Gasto[]>([])
  const login = (user: string) => setUsuario(user)
  const guardarPresupuesto = (monto: number) => setPresupuesto(monto)
  const obtenerGastos = useCallback(async () => {
    const res = await fetch(`${API_URL}/gasto`)
    if (!res.ok) throw new Error("No se pudieron cargar los gastos")
    const data: unknown = await res.json()
    if (!Array.isArray(data) || !data.every(g => g && typeof g === "object" &&
      typeof g.idgasto === "number" && typeof g.categoria === "string" &&
      (typeof g.monto === "string" || typeof g.monto === "number") && Number.isFinite(Number(g.monto)) &&
      typeof g.fecha === "string")) throw new Error("La API devolvio gastos con formato inesperado")
    setGastos(data as Gasto[])
  }, [])
  const agregarGasto = async (gasto: NuevoGasto) => {
    const res = await fetch(`${API_URL}/gasto`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(gasto)
    })
    if (!res.ok) throw new Error("No se pudo guardar el gasto. Revisa los datos e intenta de nuevo.")
    await obtenerGastos()
  }
  const totalGastos = gastos.reduce((total, gasto) => total + Number(gasto.monto), 0)
  return <GastoContext.Provider value={{ usuario, login, presupuesto, guardarPresupuesto, gastos, agregarGasto, obtenerGastos, totalGastos }}>{children}</GastoContext.Provider>
}
export function useGasto() {
  const context = useContext(GastoContext)
  if (!context) throw new Error("useGasto requiere GastoProvider")
  return context
}
