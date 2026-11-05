"use client"

import { useState, useEffect, type FormEvent } from "react"
import Link from "next/link"
import { useGasto } from "../context/gastoContext"

export default function Gastos() {
  const { gastos, agregarGasto, obtenerGastos, presupuesto, totalGastos } = useGasto()
  const [monto, setMonto] = useState("")
  const [categoria, setCategoria] = useState("Comida")
  const [fecha, setFecha] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  useEffect(() => {
    let activo = true
    obtenerGastos().catch(() => { if (activo) setError("No se pudieron cargar los gastos. Verifica que el backend este disponible.") })
      .finally(() => { if (activo) setCargando(false) })
    return () => { activo = false }
  }, [obtenerGastos])
  async function guardarGasto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!Number.isFinite(Number(monto)) || Number(monto) <= 0 || !fecha) {
      setError("Ingresa un monto positivo y una fecha valida."); return
    }
    setError(""); setGuardando(true)
    try { await agregarGasto({ monto, categoria, fecha }); setMonto(""); setFecha("") }
    catch (err) { setError(err instanceof Error ? err.message : "No se pudo guardar el gasto") }
    finally { setGuardando(false) }
  }
  return <main style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
    <h1>Administrador de gastos</h1>
    <p>Presupuesto: L. {presupuesto.toFixed(2)} | Gastos: L. {totalGastos.toFixed(2)}</p>
    <Link href="/presupuesto">Actualizar presupuesto</Link>
    {presupuesto > 0 && totalGastos >= presupuesto * 0.8 && <p role="status">{totalGastos > presupuesto ? "Superaste el presupuesto." : "Ya utilizaste al menos el 80% del presupuesto."}</p>}
    <form onSubmit={guardarGasto} style={{ display: "grid", gap: 10, maxWidth: 400, margin: "20px 0" }}>
      <label htmlFor="monto">Monto</label>
      <input id="monto" type="number" min="0.01" step="0.01" required value={monto} onChange={e => setMonto(e.target.value)} />
      <label htmlFor="categoria">Categoria</label>
      <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
        <option>Comida</option><option>Transporte</option><option>Ropa</option>
      </select>
      <label htmlFor="fecha">Fecha</label>
      <input id="fecha" type="date" required value={fecha} onChange={e => setFecha(e.target.value)} />
      <button disabled={guardando || cargando}>{guardando ? "Guardando..." : "Guardar gasto"}</button>
    </form>
    {error && <p role="alert">{error}</p>}
    {cargando ? <p role="status">Cargando gastos...</p> : gastos.length === 0 ? <p>No hay gastos registrados.</p> :
      <table><caption>Gastos registrados</caption><thead><tr><th>Monto</th><th>Categoria</th><th>Fecha</th></tr></thead>
        <tbody>{gastos.map(g => <tr key={g.idgasto}><td>L. {Number(g.monto).toFixed(2)}</td><td>{g.categoria}</td><td>{g.fecha.slice(0, 10)}</td></tr>)}</tbody>
      </table>}
  </main>
}
