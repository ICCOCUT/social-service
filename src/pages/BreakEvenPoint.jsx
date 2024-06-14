import React, {useState} from 'react';

const BreakEvenPoint = () => {
    const [fixedCosts, setFixedCosts] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [profit, setProfit] = useState('');
    const [breakEven, setBreakEven] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [hoverFixedCosts, setHoverFixedCosts] = useState(false);
    const [hoverUnitPrice, setHoverUnitPrice] = useState(false);
    const [hoverProfit, setHoverProfit] = useState(false);
    const [hoverBreakEven, setHoverBreakEven] = useState(false);

    const calculateBreakEven = () => {
        const fixedCostsValue = parseFloat(fixedCosts);
        const unitPriceValue = parseFloat(unitPrice);
        const profitValue = parseFloat(profit);

        if (!isNaN(fixedCostsValue) && !isNaN(unitPriceValue) && !isNaN(profitValue)) {
            if (unitPriceValue - profitValue !== 0) {
                const breakEvenPoint = fixedCostsValue / (unitPriceValue - profitValue);
                setBreakEven(breakEvenPoint.toFixed(2));
                setErrorMessage('');
            } else {
                setBreakEven(null);
                setErrorMessage('Cannot calculate: Unit Price - Profit cannot be zero');
            }
        } else {
            setBreakEven(null);
            setErrorMessage('Please enter valid numbers for all fields');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 relative">
                    Cálculo del punto de equilibrio
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="inline-block w-4 h-4 ml-2 text-blue-500"
                        onMouseEnter={() => setHoverBreakEven(true)}
                        onMouseLeave={() => setHoverBreakEven(false)}
                    >
                        <path fillRule="evenodd"
                              d="M12 2a10 10 0 100 20 10 10 0 000-20zm-.75 6a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0V8zm0 4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5z"
                              clipRule="evenodd"/>
                    </svg>
                    {hoverBreakEven && (
                        <div
                            className="absolute bg-white border border-gray-300 p-2 rounded-md shadow-md top-full left-0 mt-1">
                            <p className="text-xs text-gray-600">Es cuando los ingresos igualan a los costos totales, sin ganancias ni pérdidas.</p>
                        </div>
                    )}
                </h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 relative" htmlFor="fixedCosts">
                        Costes fijos mensuales
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="inline-block w-4 h-4 ml-2 text-blue-500"
                            onMouseEnter={() => setHoverFixedCosts(true)}
                            onMouseLeave={() => setHoverFixedCosts(false)}
                        >
                            <path fillRule="evenodd"
                                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm-.75 6a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0V8zm0 4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5z"
                                  clipRule="evenodd"/>
                        </svg>
                        {hoverFixedCosts && (
                            <div
                                className="absolute bg-white border border-gray-300 p-2 rounded-md shadow-md top-full left-0 mt-1">
                                <p className="text-xs text-gray-600">Gastos que no cambian con el nivel de producción.</p>
                            </div>
                        )}
                    </label>
                    <input
                        type="number"
                        id="fixedCosts"
                        value={fixedCosts}
                        onChange={(e) => setFixedCosts(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Introduzca los costes fijos mensuales"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 relative" htmlFor="unitPrice">
                        Precio Unitario
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="inline-block w-4 h-4 ml-2 text-blue-500"
                            onMouseEnter={() => setHoverUnitPrice(true)}
                            onMouseLeave={() => setHoverUnitPrice(false)}
                        >
                            <path fillRule="evenodd"
                                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm-.75 6a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0V8zm0 4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5z"
                                  clipRule="evenodd"/>
                        </svg>
                        {hoverUnitPrice && (
                            <div
                                className="absolute bg-white border border-gray-300 p-2 rounded-md shadow-md top-full left-0 mt-1">
                                <p className="text-xs text-gray-600">Costo por cada unidad de un producto.</p>
                            </div>
                        )}
                    </label>
                    <input
                        type="number"
                        id="unitPrice"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Introduzca el precio unitario"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 relative" htmlFor="profit">
                        Profit
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="inline-block w-4 h-4 ml-2 text-blue-500"
                            onMouseEnter={() => setHoverProfit(true)}
                            onMouseLeave={() => setHoverProfit(false)}
                        >
                            <path fillRule="evenodd"
                                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm-.75 6a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0V8zm0 4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5z"
                                  clipRule="evenodd"/>
                        </svg>
                        {hoverProfit && (
                            <div
                                className="absolute bg-white border border-gray-300 p-2 rounded-md shadow-md top-full left-0 mt-1">
                                <p className="text-xs text-gray-600">Ganancia neta después de restar costos y gastos de los ingresos.</p>
                            </div>
                        )}
                    </label>
                    <input
                        type="number"
                        id="profit"
                        value={profit}
                        onChange={(e) => setProfit(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Introduzca el beneficio deseado"
                    />
                </div>
                <button
                    onClick={calculateBreakEven}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Calcular el umbral de rentabilidad
                </button>
                {breakEven !== null && errorMessage === '' && (
                    <p className="mt-4 text-center text-black">
                        Punto de equilibrio: {breakEven}
                    </p>
                )}
                {errorMessage !== '' && (
                    <p className="mt-4 text-center text-red-500">
                        {errorMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default BreakEvenPoint;
