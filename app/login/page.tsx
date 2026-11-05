'use client'
import { useState } from "react";
import { useGasto } from "../context/gastoContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const [user, setUser] = useState("");
    const [clave, setClave] = useState("");
    const [error, setError] = useState("");
    const { login } = useGasto();
    const router = useRouter();

    const iniciarSesion = () => {
        if (user === "admin" && clave === "admin123") {
            login(user);
            router.push("/presupuesto");
        } else {
            setError("Usuario o clave incorrectos");
        }
    };

    return (
        <div style={{padding: '20px', maxWidth: '300px', margin: 'auto'}}>
            <h1>Inicio de Sesion</h1>
            <p>Demo academica: admin / admin123. Esta pantalla no implementa autenticacion segura.</p>
            <input placeholder="Usuario" style={{border: '1px solid gray', padding: '8px', width: '100%', marginBottom: '8px'}} onChange={e => setUser(e.target.value)} />
            <input type="password" placeholder="Clave" style={{border: '1px solid gray', padding: '8px', width: '100%', marginBottom: '8px'}} onChange={e => setClave(e.target.value)} />
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button onClick={iniciarSesion} style={{background: 'blue', color: 'white', padding: '8px 16px'}}>
                Iniciar Sesion
            </button>
        </div>
    );
}