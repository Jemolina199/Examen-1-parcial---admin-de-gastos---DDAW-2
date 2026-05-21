'use client'
import { useState, useEffect } from "react";
import { useGasto } from "../context/gastoContext";

export default function Gastos() {
    const { gastos, agregarGasto, obtenerGastos, presupuesto } = useGasto();
    const [monto, setMonto] = useState("");
    const [categoria, setCategoria] = useState("Comida");
    const [fecha, setFecha] = useState("");

    useEffect(() => {
        obtenerGastos();
    }, []);

    const guardarGasto = async () => {
        await agregarGasto({ monto, categoria, fecha });
    };

    return (
        <div style={{padding: '20px'}}>
            <h2>Presupuesto: L. {presupuesto}</h2>
            <input type="number" placeholder="Monto" onChange={e => setMonto(e.target.value)} />
            <select onChange={e => setCategoria(e.target.value)}>
                <option>Comida</option>
                <option>Transporte</option>
                <option>Ropa</option>
            </select>
            <input type="date" onChange={e => setFecha(e.target.value)} />
            <button onClick={guardarGasto}>Guardar Gasto</button>

            <table>
                <thead>
                    <tr>
                        <th>Monto</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {gastos.map((g: any) => (
                        <tr key={g.idgasto}>
                            <td>{g.monto}</td>
                            <td>{g.categoria}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}