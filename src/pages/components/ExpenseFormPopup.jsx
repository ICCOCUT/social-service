import React, { useState } from 'react';

const ExpenseFormPopup = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({
    renta: '',
    servicios: '',
    sueldos: '',
    otros: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Permitir solo números en el campo
    if (/^\d*\.?\d*$/.test(value)) {
      setFields((prevFields) => ({ ...prevFields, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = Object.values(fields).reduce((acc, curr) => acc + parseFloat(curr || 0), 0);
    onSubmit(total);
    setIsOpen(false);
  };

  return (
    <div>
      <div className='flex justify-center mt-4'>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Añadir Gastos Fijos
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-gray-300 text-gray-700 rounded-lg p-8 z-10 max-w-md mx-auto">
            <h2 className="text-2xl ">Añadir Gastos Fijos</h2>
            <p className="text-sm text-gray-600 mb-4">¿Cuánto gastas mensualmente en cada categoría?
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Renta</label>
                <input
                  type="text"
                  name="renta"
                  value={fields.renta}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Servicios</label>
                <input
                  type="text"
                  name="servicios"
                  value={fields.servicios}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-black"

                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Sueldos</label>
                <input
                  type="text"
                  name="sueldos"
                  value={fields.sueldos}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Otros</label>
                <input
                  type="text"
                  name="otros"
                  value={fields.otros}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-black"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-4 py-2 rounded "
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseFormPopup;
