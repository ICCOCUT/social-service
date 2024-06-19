import React, { useState } from 'react';
import ExpenseFormPopup from './components/ExpenseFormPopup';

const CostoPorHora = () => {
  const [gastosFijos, setGastosFijos] = useState(null);
  const [costoPorHora, setCostoPorHora] = useState([]);
  const porcentajes = [10, 30, 50, 100, 200, 1000];

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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Calculadora de Costo por Hora</h2>
        <ExpenseFormPopup onSubmit={handleGastosFijosSubmit} />
        <div className="mt-4">
          {gastosFijos !== null && (
            <div>
              <h3 className="text-lg font-bold mb-4 text-center  text-black">Gastos Fijos</h3>
              <p className="text-center text-black">Total de gastos fijos: ${gastosFijos.toFixed(2)}</p>
              <button
                onClick={calcularCostoPorHora}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              >
                Calcular
              </button>
            </div>
          )}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostoPorHora;
