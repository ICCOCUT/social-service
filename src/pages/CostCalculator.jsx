import React, { useState, useEffect } from 'react';
import ExpenseFormPopup from './components/ExpenseFormPopup';

const CostoPorHora = () => {
    const [gastosFijos, setGastosFijos] = useState(null);
    const [costoPorHora, setCostoPorHora] = useState([]);
    const [isClient, setIsClient] = useState(false);
    const porcentajes = [10, 30, 50, 100, 200, 1000];

    useEffect(() => {
        // Check if we're on the client
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const saved = localStorage.getItem('gastosFijos');
            if (saved) {
                setGastosFijos(JSON.parse(saved));
            }
        }
    }, [isClient]);

    useEffect(() => {
        if (gastosFijos !== null && isClient) {
            localStorage.setItem('gastosFijos', JSON.stringify(gastosFijos));
        }
    }, [gastosFijos, isClient]);

    const calcularCostoPorHora = () => {
        if (gastosFijos !== null && !isNaN(gastosFijos)) {
            const resultados = porcentajes.map((porcentaje) => {
                const resultado = (gastosFijos + (gastosFijos * porcentaje / 100)) / 208;
                return { porcentaje, costo: resultado.toFixed(2) };
            });
            setCostoPorHora(resultados);
        } else {
            alert('Ingrese un valor válido para los gastos fijos.');
        }
    };

    const handleGastosFijosSubmit = (total) => {
        setGastosFijos(total);
        setCostoPorHora([]); // Reset the results when new fixed costs are submitted
    };

    const resetearDatos = () => {
        setGastosFijos(null);
        setCostoPorHora([]);
        localStorage.removeItem('gastosFijos');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-600 text-gray-200 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">¿Cuánto vale tu tiempo?</h2>
                {!gastosFijos && <ExpenseFormPopup onSubmit={handleGastosFijosSubmit} />}
                <div className="mt-4">
                    {gastosFijos !== null && (
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-center">Gastos Fijos</h3>
                            <p className="text-center">Total de gastos fijos: ${gastosFijos.toFixed(2)}</p>
                            <h3 className="text-lg font-bold mb-4 text-center">Costo por Hora (sin porcentaje)</h3>
                            <p className="text-center">
                                ${(gastosFijos / 208).toFixed(2)}
                            </p>
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={calcularCostoPorHora}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Calcular con Porcentajes
                                </button>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={resetearDatos}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Reiniciar y Borrar Datos
                                </button>
                            </div>
                        </div>
                    )}
                    {costoPorHora.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-bold mb-4 text-center">Tu tiempo vale</h3>
                            <ul className="space-y-2">
                                {costoPorHora.map((result, index) => (
                                    <li key={index} className="bg-blue-500 text-white p-3 rounded-md shadow-sm">
                                        <span className="font-semibold">Si agregas un {result.porcentaje}% Tu tiempo valdria esto</span> ${result.costo}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CostoPorHora;
