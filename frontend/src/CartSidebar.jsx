import React from "react";

export default function CartSidebar({ cart, onRemove }) {
  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col border-l border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold">🛒 Cart</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="text-gray-500 text-center mt-8">No products in cart.</div>
        ) : (
          <ul className="space-y-4">
            {cart.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{item.name}</div>
                  <div className="text-gray-600 text-sm">{item.category}</div>
                  <div className="text-gray-800 font-bold">${parseFloat(item.price).toFixed(2)}</div>
                </div>
                <button
                  className="ml-2 text-red-500 hover:text-red-700 text-lg font-bold"
                  onClick={() => onRemove(idx)}
                  title="Remove"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {cart.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>
              ${cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
