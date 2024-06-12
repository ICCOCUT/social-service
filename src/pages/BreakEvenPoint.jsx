import React, { useState } from 'react';

const BreakEvenPoint = () => {
  const [fixedCosts, setFixedCosts] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [profit, setProfit] = useState('');
  const [breakEven, setBreakEven] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Break-Even Point Calculator</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fixedCosts">
            Monthly Fixed Costs
          </label>
          <input
            type="number"
            id="fixedCosts"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter monthly fixed costs"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unitPrice">
            Unit Price
          </label>
          <input
            type="number"
            id="unitPrice"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter unit price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profit">
            Profit
          </label>
          <input
            type="number"
            id="profit"
            value={profit}
            onChange={(e) => setProfit(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter desired profit"
          />
        </div>
        <button
          onClick={calculateBreakEven}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Calculate Break-Even Point
        </button>
        {breakEven !== null && errorMessage === '' && (
          <p className="mt-4 text-center text-black">
            Break-Even Point: {breakEven}
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
