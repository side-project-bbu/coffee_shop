import React from 'react';

const Header = ({ onPageChange, activePage }) => {
    const pages = ["Red", "Gray", "Blue"];

    return (
        <header className="bg-gray-100 p-4 border-b border-gray-300 flex items-center justify-between">
            <h1 className="m-0 text-2xl text-gray-800">Coffee Shop</h1>
            <nav>
                {pages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        className={`mx-1 py-1 px-3 rounded cursor-pointer ${activePage === page ? 'bg-blue-500 text-gray-900 font-semibold' : 'bg-gray-100 text-gray-700'}`}
                    >
                        {page}
                    </button>
                ))}
            </nav>
        </header>
    );
};

export default Header;