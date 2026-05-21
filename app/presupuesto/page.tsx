'use client'
import { useState } from "react";
import { useGasto } from "../context/gastoContext";
import { useRouter } from "next/navigation";

export default function Presupuesto() {
    const [monto, setMonto] = useState(0);
    const { guardarPresupuesto, totalGastos } = useGasto();
    const router = useRouter();

    const guardar = () => {
        guardarPresupuesto(monto);
        router.push("/gastos");
    };

    return (
        <div style={{padding: '20px', maxWidth: '400px', margin: 'auto'}}>
            <h1>Establecer Presupuesto Mensual</h1>
            <input 
                type="number" 
                placeholder="Monto de presupuesto Mensual"
                style={{border: '1px solid gray', padding: '8px', width: '100%', marginBottom: '10px'}}
                onChange={e => setMonto(Number(e.target.value))} 
            />
            <button onClick={guardar} style={{background: 'blue', color: 'white', padding: '8px 16px'}}>
                Guardar Presupuesto
            </button>

            {totalGastos >= monto * 0.8 && monto > 0 && (
                <p style={{background: 'yellow', padding: '8px', marginTop: '10px'}}>
                    Ya llegaste al 80% del presupuesto
                </p>
            )}
            {totalGastos > monto && monto > 0 && (
                <p style={{background: 'red', color: 'white', padding: '8px', marginTop: '5px'}}>
                    Te pasaste del limite del presupuesto, ajusta la faja y ajusta los gastos
                </p>
            )}
        </div>
    );
}