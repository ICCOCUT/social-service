import React, { useState } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import ResetButton from "./components/ResetButton";

const ProductPrice = () => {
    const [unitPrice, setUnitPrice] = useState('');
    const [laborPercentage, setLaborPercentage] = useState('');
    const [customLaborPercentage, setCustomLaborPercentage] = useState('');
    const [workType, setWorkType] = useState('');
    const [finalPrice, setFinalPrice] = useState(null);
    const [errors, setErrors] = useState({});
    const [priceTable, setPriceTable] = useState(null);
    const [calculated, setCalculated] = useState(false);

    // Formato de dinero
    const formatMoney = (amount) => {
        return Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Validación de los campos
    const validateInputs = () => {
        let isValid = true;
        let newErrors = {};

        if (!unitPrice || isNaN(unitPrice) || unitPrice <= 0) {
            newErrors.unitPrice = "Por favor, introduce un costo de materia prima válido.";
            isValid = false;
        }

        if (!laborPercentage) {
            newErrors.laborPercentage = "Por favor, selecciona un porcentaje de mano de obra.";
            isValid = false;
        }

        if (laborPercentage === 'otro' && (!customLaborPercentage || isNaN(customLaborPercentage) || customLaborPercentage <= 0)) {
            newErrors.customLaborPercentage = "Por favor, introduce un porcentaje de mano de obra válido.";
            isValid = false;
        }

        if (!workType) {
            newErrors.workType = "Por favor, selecciona un tipo de trabajo.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Calcular el precio
    const calculatePrice = () => {
        if (!validateInputs()) return;

        const materialCost = parseFloat(unitPrice);
        const laborCostPercentage = laborPercentage === 'otro'
            ? parseFloat(customLaborPercentage)
            : parseFloat(laborPercentage);

        const laborCost = (materialCost * laborCostPercentage) / 100;
        const subtotal1 = materialCost + laborCost;

        let workTypePercentage = 0;
        if (workType === 'artesanal') workTypePercentage = 20;
        if (workType === 'semi-industrial') workTypePercentage = 10;
        if (workType === 'industrial') workTypePercentage = 5;

        const workTypeCost = (subtotal1 * workTypePercentage) / 100;
        const finalProductPrice = subtotal1 + workTypeCost;

        setFinalPrice(finalProductPrice.toFixed(2));
        setCalculated(true);

        const priceForOnePiece = finalProductPrice + (finalProductPrice); // 100% utilidad
        const priceForDecena = finalProductPrice + (finalProductPrice * 0.50); // 50%
        const priceForCentena = finalProductPrice + (finalProductPrice * 0.15); // 15%
        const priceForMillar = finalProductPrice + (finalProductPrice * 0.05); // 5%

        setPriceTable([
            { quantity: "Precio por una sola pieza", percentage: "100%", price: priceForOnePiece },
            { quantity: "Precio por decena", percentage: "50%", price: priceForDecena },
            { quantity: "Precio por centena", percentage: "15%", price: priceForCentena },
            { quantity: "Precio por millar", percentage: "5%", price: priceForMillar }
        ]);
    };

    // Reset
    const resetData = () => {
        setUnitPrice('');
        setLaborPercentage('');
        setCustomLaborPercentage('');
        setWorkType('');
        setFinalPrice(null);
        setErrors({});
        setPriceTable(null);
        setCalculated(false);
    };

    return (
        <MathJaxContext>
            <div className="flex items-center justify-center bg-gray-900">
                <div className="p-8 rounded-lg shadow-md w-full max-w-md bg-gray-600 text-gray-200">
                    <h2 className="text-2xl font-bold mb-6 text-center relative">
                        Cálculo del precio de tu producto
                    </h2>

                    {/* Costo materia prima */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="unitPrice">
                            Establece el costo de tu materia prima (por unidad y sin IVA)
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                            <input
                                type="number"
                                id="unitPrice"
                                value={unitPrice}
                                onChange={(e) => setUnitPrice(e.target.value)}
                                className="pl-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Introduzca el precio de tus materiales"
                            />
                        </div>
                        {errors.unitPrice && <p className="text-red-500 text-xs mt-1">{errors.unitPrice}</p>}
                    </div>

                    {/* Porcentaje mano de obra */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="laborPercentage">
                            Establezca el porcentaje relacionado con la mano de obra:
                        </label>
                        <select
                            id="laborPercentage"
                            value={laborPercentage}
                            onChange={(e) => setLaborPercentage(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="25">25% - Poca intervención</option>
                            <option value="50">50% - Intervención moderada</option>
                            <option value="100">100% - Alta intervención</option>
                            <option value="otro">Otro</option>
                        </select>
                        {errors.laborPercentage && <p className="text-red-500 text-xs mt-1">{errors.laborPercentage}</p>}
                    </div>

                    {/* Porcentaje personalizado */}
                    {laborPercentage === 'otro' && (
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="customLaborPercentage">
                                Ingrese el porcentaje personalizado de mano de obra:
                            </label>
                            <input
                                type="number"
                                id="customLaborPercentage"
                                value={customLaborPercentage}
                                onChange={(e) => setCustomLaborPercentage(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Introduzca el porcentaje"
                            />
                            {errors.customLaborPercentage && <p className="text-red-500 text-xs mt-1">{errors.customLaborPercentage}</p>}
                        </div>
                    )}

                    {/* Tipo de trabajo */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="workType">
                            Define el tipo de trabajo:
                        </label>
                        <select
                            id="workType"
                            value={workType}
                            onChange={(e) => setWorkType(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="artesanal">Trabajo de tipo artesanal</option>
                            <option value="semi-industrial">Trabajo semi-industrializado</option>
                            <option value="industrial">Trabajo industrializado</option>
                        </select>
                        {errors.workType && <p className="text-red-500 text-xs mt-1">{errors.workType}</p>}
                    </div>

                    {/* Botón calcular */}
                    <div className="flex items-center justify-center mb-4">
                        {!calculated && (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={calculatePrice}
                            >
                                Calcular
                            </button>
                        )}
                    </div>

                    {/* Resultado final */}
                    {finalPrice && (
                        <div className="text-center mt-4">
                            <h3 className="text-lg font-bold">
                                El precio de tu producto sin utilidad es: ${formatMoney(finalPrice)} + IVA
                            </h3>
                        </div>
                    )}

                    {/* Tabla de precios */}
                    {priceTable && (
                        <div className="text-center mt-6">
                            <h3 className="text-lg font-bold mb-4">Tabla de precios según cantidad:</h3>
                            <table className="table-auto w-full text-gray-300 border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b-2 border-gray-400 px-4 py-2">Cantidad</th>
                                        <th className="border-b-2 border-gray-400 px-4 py-2">Porcentaje de utilidad</th>
                                        <th className="border-b-2 border-gray-400 px-4 py-2">Precio de venta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {priceTable.map((row, index) => (
                                        <tr key={index}>
                                            <td className="border-b border-gray-500 px-4 py-2">{row.quantity}</td>
                                            <td className="border-b border-gray-500 px-4 py-2">{row.percentage}</td>
                                            <td className="border-b border-gray-500 px-4 py-2">
                                                ${formatMoney(row.price)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Botón reset */}
                    {calculated && <ResetButton resetData={resetData} />}
                </div>
            </div>
        </MathJaxContext>
    );
};

export default ProductPrice;
