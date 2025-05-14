import React, {useState, useEffect} from 'react';
import ExpenseFormPopup from './components/ExpenseFormPopup';
import {MathJax, MathJaxContext} from 'better-react-mathjax';
import ResetButton from "./components/ResetButton";

const BreakEvenPoint = () => {
    const [fixedCosts, setFixedCosts] = useState(null);
    const [unitPrice, setUnitPrice] = useState('');
    const [profit, setProfit] = useState('');
    const [breakEven, setBreakEven] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [hoverUnitPrice, setHoverUnitPrice] = useState(false);
    const [hoverProfit, setHoverProfit] = useState(false);
    const [hoverBreakEven, setHoverBreakEven] = useState(false);

    useEffect(() => {
        const storedFixedCosts = localStorage.getItem('fixedCosts');
        const storedUnitPrice = localStorage.getItem('unitPrice');
        const storedProfit = localStorage.getItem('profit');
        const storedBreakEven = localStorage.getItem('breakEven');
    
        if (storedFixedCosts) setFixedCosts(parseFloat(storedFixedCosts));
        if (storedUnitPrice) setUnitPrice(storedUnitPrice); // sigue como string para input
        if (storedProfit) setProfit(storedProfit); // sigue como string para input
        if (storedBreakEven) setBreakEven(storedBreakEven);
    }, []);
    

    const calculateBreakEven = () => {
        const fixedCostsValue = parseFloat(fixedCosts);
        const unitPriceValue = parseFloat(unitPrice);
        const profitValue = parseFloat(profit);

        if (!isNaN(fixedCostsValue) && !isNaN(unitPriceValue) && !isNaN(profitValue)) {
            if (unitPriceValue - profitValue !== 0) {
                const breakEvenPoint = fixedCostsValue / (unitPriceValue - profitValue);
                setBreakEven(breakEvenPoint.toFixed(2));
                localStorage.setItem('fixedCosts', fixedCosts);
                localStorage.setItem('unitPrice', unitPrice);
                localStorage.setItem('profit', profit);
                localStorage.setItem('breakEven', breakEvenPoint.toFixed(2));
                setErrorMessage('');
            } else {
                setBreakEven(null);
                setErrorMessage('No se puede calcular: Precio Unitario - Ganancias no pueden ser iguales a cero');
            }
        } else {
            setBreakEven(null);
            setErrorMessage('Por favor introduce números válidos en todos los campos');
        }
    };

    const handleExpenseFormSubmit = (totalFixedCosts) => {
        setFixedCosts(totalFixedCosts);
    };

    const resetData = () => {
        setFixedCosts(null);
        setUnitPrice('');
        setProfit('');
        setBreakEven(null);
        setErrorMessage('');
        localStorage.removeItem('fixedCosts');
        localStorage.removeItem('unitPrice');
        localStorage.removeItem('profit');
        localStorage.removeItem('breakEven');

    };
    let calc = fixedCosts / unitPrice;

    return (
        <MathJaxContext>
            <div className="flex items-center justify-center bg-gray-900">
                <div className="p-8 rounded-lg shadow-md w-full max-w-md bg-gray-600 text-gray-200">
                    <h2 className="text-2xl font-bold mb-6 text-center relative">
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
                                <p className="text-xs text-gray-600">Es cuando los ingresos igualan a los costos
                                    totales, sin ganancias ni pérdidas.</p>
                            </div>
                        )}
                    </h2>
                    {!fixedCosts && <ExpenseFormPopup onSubmit={handleExpenseFormSubmit}/>}

                    {fixedCosts && (
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-bold mb-4">Gastos Fijos Mensuales</h3>
                            <p>Total de gastos fijos: ${fixedCosts.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 relative" htmlFor="unitPrice">
                            Precio de Venta
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
                            placeholder="Introduzca el precio de venta para su producto o servicio"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 relative" htmlFor="profit">
                            Ganancia
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
                                    <p className="text-xs text-gray-600">Ganancia neta después de restar costos y gastos
                                        de los ingresos.</p>
                                </div>
                            )}
                        </label>
                        <input
                            type="number"
                            id="profit"
                            value={profit}
                            onChange={(e) => setProfit(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduzca el porcentaje de ganancias estimado"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            onClick={calculateBreakEven}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Calcular
                        </button>
                    </div>

                    {breakEven && (
                        <>
                            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded text-center">
                                <p>Necesitas producir y vender {(breakEven)} unidades de tu producto o servicio.</p>
                            </div>
                            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded text-center">
                                <p>Si lo logras, tus ventas mensuales serán de ${Number(unitPrice * breakEven).toLocaleString()} mensuales.</p>
                            </div>
                            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded text-center">
                                <p>A partir de la unidad {Number((fixedCosts / unitPrice).toFixed(2)).toLocaleString()} comienzas a tener ganancias.</p>
                            </div>

                            {/* Mostrar la fórmula usando MathJax */}
                            <div
                                className="bg-gray-700 text-center text-white font-mono p-3 my-4 rounded-md shadow-md overflow-x-auto">
                                <p className="font-bold mb-2">La fórmula para realizar este cálculo es:</p>
                                <MathJax className="text-xs">
                                    {`\\[ \\text{Punto de equilibrio} = \\frac{\\text{Gastos Fijos Mensuales}}{\\text{Precio Unitario} - \\text{Ganancias}} \\]`}
                                </MathJax>
                            </div>
                            {/* Botón de reiniciar */}
                            <ResetButton resetData={resetData}/>
                        </>
                    )}

                    {errorMessage && (
                        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                            <p className="text-center">{errorMessage}</p>
                        </div>
                    )}
                </div>
            </div>
        </MathJaxContext>
    );
};

export default BreakEvenPoint;
