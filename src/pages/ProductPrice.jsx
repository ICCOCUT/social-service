import React, {useState} from 'react';
import {MathJaxContext} from 'better-react-mathjax';
import ResetButton from "./components/ResetButton";

const ProductPrice = () => {
    const [unitPrice, setUnitPrice] = useState('');
    const [laborPercentage, setLaborPercentage] = useState('');
    const [customLaborPercentage, setCustomLaborPercentage] = useState('');
    const [workType, setWorkType] = useState('');
    const [finalPrice, setFinalPrice] = useState(null);
    const [errors, setErrors] = useState({});
    const [priceTable, setPriceTable] = useState(null);
    const [calculated, setCalculated] = useState(false); // Nuevo estado para controlar la visibilidad

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

    // Función para calcular el precio
    const calculatePrice = () => {
        if (!validateInputs()) return;

        // Costo de materia prima
        const materialCost = parseFloat(unitPrice);

        // Porcentaje de mano de obra (usar personalizado si es seleccionado)
        const laborCostPercentage =
            laborPercentage === 'otro'
                ? parseFloat(customLaborPercentage)
                : parseFloat(laborPercentage);

        // Costo de la mano de obra
        const laborCost = (materialCost * laborCostPercentage) / 100;

        // Sub-total 1
        const subtotal1 = materialCost + laborCost;

        // Porcentaje adicional según el tipo de trabajo
        let workTypePercentage = 0;
        if (workType === 'artesanal') {
            workTypePercentage = 20;
        } else if (workType === 'semi-industrial') {
            workTypePercentage = 10;
        } else if (workType === 'industrial') {
            workTypePercentage = 5;
        }

        // Costo adicional por tipo de trabajo
        const workTypeCost = (subtotal1 * workTypePercentage) / 100;

        // Precio final sin utilidad
        const finalProductPrice = subtotal1 + workTypeCost;

        // Guardar el precio calculado
        setFinalPrice(finalProductPrice.toFixed(2));
        setCalculated(true); // Establecer el estado a true después de calcular

        // Calcular los precios de venta según la cantidad con su respectiva utilidad
        const priceForOnePiece = finalProductPrice + (finalProductPrice); // 100% utilidad
        const priceForDecena = finalProductPrice + (finalProductPrice * 0.50); // 50% utilidad
        const priceForCentena = finalProductPrice + (finalProductPrice * 0.15); // 15% utilidad
        const priceForMillar = finalProductPrice + (finalProductPrice * 0.05); // 5% utilidad

        // Guardar los precios en la tabla
        setPriceTable([
            {quantity: "Precio por una sola pieza", percentage: "100%", price: priceForOnePiece.toFixed(2)},
            {quantity: "Precio por decena", percentage: "50%", price: priceForDecena.toFixed(2)},
            {quantity: "Precio por centena", percentage: "15%", price: priceForCentena.toFixed(2)},
            {quantity: "Precio por millar", percentage: "5%", price: priceForMillar.toFixed(2)}
        ]);
    };

    // Función para reiniciar los datos
    const resetData = () => {
        setUnitPrice('');
        setLaborPercentage('');
        setCustomLaborPercentage('');
        setWorkType('');
        setFinalPrice(null);
        setErrors({});
        setPriceTable(null);
        setCalculated(false); // Reiniciar el estado al reiniciar
    };

    return (
        <MathJaxContext>
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="p-8 rounded-lg shadow-md w-full max-w-md bg-gray-600 text-gray-200">
                    <h2 className="text-2xl font-bold mb-6 text-center relative">
                        Cálculo del precio de tu producto
                    </h2>

                    {/* Input para el costo de la materia prima */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 relative" htmlFor="unitPrice">
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
                        {errors.unitPrice && (
                            <p className="text-red-500 text-xs mt-1">{errors.unitPrice}</p>
                        )}
                    </div>

                    {/* Input para porcentaje de la mano de obra */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 relative" htmlFor="laborPercentage">
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
                        {errors.laborPercentage && (
                            <p className="text-red-500 text-xs mt-1">{errors.laborPercentage}</p>
                        )}
                    </div>

                    {/* Input adicional para porcentaje personalizado si se elige "Otro" */}
                    {laborPercentage === 'otro' && (
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2 relative" htmlFor="customLaborPercentage">
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
                            {errors.customLaborPercentage && (
                                <p className="text-red-500 text-xs mt-1">{errors.customLaborPercentage}</p>
                            )}
                        </div>
                    )}

                    {/* Input para el tipo de trabajo */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 relative" htmlFor="workType">
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
                        {errors.workType && (
                            <p className="text-red-500 text-xs mt-1">{errors.workType}</p>
                        )}
                    </div>

                    {/* Botón para calcular */}
                    <div className="flex items-center justify-center mb-4">
                        {!calculated && ( // Solo mostrar el botón si no se ha calculado
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={calculatePrice}
                            >
                                Calcular
                            </button>
                        )}
                    </div>

                    {/* Mostrar el precio calculado si existe */}
                    {finalPrice && (
                        <div className="text-center mt-4">
                            <h3 className="text-lg font-bold">El precio de tu producto sin utilidad es: ${finalPrice} +
                                IVA</h3>
                        </div>
                    )}

                    {/* Mostrar la tabla de precios si existe */}
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
                                        <td className="border-b border-gray-500 px-4 py-2">${row.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {/* Botón de reinicio visible solo después de calcular */}
                    {calculated && <ResetButton resetData={resetData}/>}
                </div>
            </div>
        </MathJaxContext>
    );
};

export default ProductPrice;
