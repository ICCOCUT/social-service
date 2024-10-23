import React from "react";

export default function ResetButton({resetData}) {
    return (
        <div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={resetData}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Reiniciar y Borrar Datos
                </button>
            </div>
            <p className="text-gray-400 text-xs mt-6 text-center">
                *Los resultados aquí mostrados son una estimación de referencia rápida y no respetan los resultados de
                un
                cálculo con más variables de las que aquí se muestran.
            </p>
        </div>
    );
}
