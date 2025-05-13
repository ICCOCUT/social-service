import React, { useState, useEffect } from 'react';
import ExpenseFormPopup from './components/ExpenseFormPopup';
import ResetButton from "./components/ResetButton";
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const CostoPorHora = () => {
    const [gastosFijos, setGastosFijos] = useState(null);
    const [costoPorHora, setCostoPorHora] = useState([]);
    const [isClient, setIsClient] = useState(false);
    const porcentajes = [10, 30, 50, 100, 200, 1000];

    useEffect(() => {
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
        if (gastosFijos !== null && !isNaN(gastosFijos)) {
            localStorage.setItem('gastosFijos', JSON.stringify(gastosFijos));
            calcularCostoPorHora();
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
        setCostoPorHora([]);
    };

    const resetearDatos = () => {
        setGastosFijos(null);
        setCostoPorHora([]);
        localStorage.removeItem('gastosFijos');
    };

    return (
        <MathJaxContext>
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-gray-600 text-gray-200 p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">¿Cuánto vale tu tiempo?</h2>
                    {!gastosFijos && <ExpenseFormPopup onSubmit={handleGastosFijosSubmit} />}
                    <div className="mt-4">
                        {gastosFijos !== null && (
                            <div>
                                <h3 className="text-lg font-bold mb-4 text-center">Gastos Fijos</h3>
                                <p className="text-center">
                                    Total de gastos fijos: ${gastosFijos.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                                </p>
                                <h3 className="text-lg font-bold mb-4 text-center">Costo por Hora (sin Ganancia)</h3>
                                <p className="text-center">
                                    ${(gastosFijos / 208).toFixed(2)}
                                </p>
                            </div>
                        )}
                        {costoPorHora.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-bold mb-4 text-center">Tu tiempo vale</h3>
                                <ul className="space-y-2">
                                    {costoPorHora.map((result, index) => (
                                        <li key={index} className="bg-blue-500 text-white p-3 rounded-md shadow-sm">
                                            <span className="font-semibold">Si agregas un {Number(result.porcentaje).toLocaleString()}% tu tiempo valdría esto</span> ${Number(result.costo).toLocaleString()}
                                        </li>
                                    ))}
                                </ul>
                                {/* Añadir la fórmula con MathJax */}
                                <div
                                    className="bg-gray-700 text-center text-white font-mono p-3 my-4 rounded-md shadow-md overflow-x-auto whitespace-nowrap">
                                    <p className="text-lg font-bold mb-2">La fórmula para realizar este cálculo es:</p>
                                    <MathJax>
                                        {`\\[ \\text{Costo por hora} = \\frac{\\text{Gastos Fijos} + \\text{Porcentaje de Ganancia}}{208} \\]`}
                                    </MathJax>
                                </div>
                                <ResetButton resetData={resetearDatos} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MathJaxContext>
    );
};

export default CostoPorHora;
