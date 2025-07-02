// frontend/src/components/Header.jsx
import React from 'react';

function Header({ title, description, children }) {
  return (
    <div className="p-6 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {title}
          </h1>
          {description && (
            <p className="text-gray-600 mt-1">
              {description}
            </p>
          )}
        </div>
        {children && (
          <div className="flex items-center gap-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
