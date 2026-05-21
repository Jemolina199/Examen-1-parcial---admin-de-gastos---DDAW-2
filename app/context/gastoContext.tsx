'use client'
import { createContext, useContext, useState } from "react";

const GastoContext = createContext<any>(null);

export function GastoProvider({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario] = useState<string | null>(null);
    const [presupuesto, setPresupuesto] = useState<number>(0);
    const [gastos, setGastos] = useState<any[]>([]);

    const login = (user: string) => setUsuario(user);

    const guardarPresupuesto = (monto: number) => setPresupuesto(monto);

    const obtenerGastos = async () => {
        const res = await fetch('http://localhost:5000/gasto');
        const data = await res.json();
        setGastos(data);
    };

    const agregarGasto = async (gasto: any) => {
        await fetch('http://localhost:5000/gasto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gasto)
        });
        await obtenerGastos();
    };

    const totalGastos = gastos.reduce((acc, g) => acc + parseFloat(g.monto), 0);

    return (
        <GastoContext.Provider value={{ usuario, login, presupuesto, guardarPresupuesto, gastos, agregarGasto, obtenerGastos, totalGastos }}>
            {children}
        </GastoContext.Provider>
    );
}

export const useGasto = () => useContext(GastoContext);