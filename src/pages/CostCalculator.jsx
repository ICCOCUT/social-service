import React, { useState } from 'react';

const CostoPorHora = () => {
    const [gastosFijos, setGastosFijos] = useState(0);
    const [costoPorHora, setCostoPorHora] = useState([]);
    const porcentajes = [10, 30, 50, 100, 200, 1000];

    const calcularCostoPorHora = () => {
        const resultados = porcentajes.map((porcentaje) => {
        const resultado = (gastosFijos + (gastosFijos * porcentaje / 100)) / 208;
        return { porcentaje, costo: resultado.toFixed(2) };
        });
        setCostoPorHora(resultados);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Calculadora de Costo por Hora</h2>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gastosFijos">
                Gastos Fijos
            </label>
            <input
                type="number"
                id="gastosFijos"
                value={gastosFijos}
                onChange={(e) => setGastosFijos(Number(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese los gastos fijos"
            />
            <button
                onClick={calcularCostoPorHora}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
                Calcular
            </button>
            </div>
            {costoPorHora.length > 0 && (
            <div className="mt-6">
                <h3 className="text-lg font-bold mb-4 text-center">Resultados</h3>
                <ul className="space-y-2">
                {costoPorHora.map((result, index) => (
                    <li key={index} className="bg-blue-500 text-white p-3 rounded-md shadow-sm">
                    <span className="font-semibold">{result.porcentaje}%:</span> ${result.costo}
                    </li>
                ))}
                </ul>
                <p className="mt-4 text-center">
                Total de gastos fijos: ${gastosFijos.toFixed(2)}
                </p>
            </div>
            )}
        </div>
        </div>
    );
    };

export default CostoPorHora;
