// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Employee from './pages/employee';
import Header from './components/Header';

function App() {
  const [message, setMessage] = useState('');
  
  // Sidebar state
  const [activeSection, setActiveSection] = useState('employees');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check FastAPI connection on component mount
  useEffect(() => {
    axios.get('http://localhost:8000/') // Adjust port if your FastAPI runs on a different one
      .then(response => {
        setMessage("Connected");
      })
      .catch(error => {
        console.error("Error connecting to FastAPI:", error);
        setMessage("Error connecting to FastAPI");
      });
  }, []);

  // Reusable NavButton component for cleaner code
  const NavButton = ({ section, icon, children }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`w-full flex items-center py-2 rounded-md transition-colors ${
        sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3'
      } ${
        activeSection === section
          ? 'bg-blue-500 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
      title={sidebarCollapsed ? children : ''}
    >
      {icon}
      {!sidebarCollapsed && <span>{children}</span>}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-white border-r border-gray-200 shadow-md flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="font-bold text-gray-800 text-md">Coffee_Shop</h1>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <NavButton 
                section="dashboard" 
                icon={<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
              >
                Dashboard
              </NavButton>
            </li>
            <li>
              <NavButton 
                section="employees" 
                icon={<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-8 8a4 4 0 018 0M12 17v1m-6 4h12a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" /></svg>}
              >
                Employees
              </NavButton>
            </li>
            <li>
              <NavButton 
                section="products" 
                icon={<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
              >
                Products
              </NavButton>
            </li>
            <li>
              <NavButton 
                section="orders" 
                icon={<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
              >
                Orders
              </NavButton>
            </li>
            <li>
              <NavButton 
                section="analytics" 
                icon={<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
              >
                Analytics
              </NavButton>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4">
          <div className="flex justify-center">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header - Only show for sections that don't have their own header */}
        {activeSection === 'dashboard' && (
          <Header 
            title="Dashboard" 
            description="Overview of your coffee shop performance"
          />
        )}
        {activeSection === 'products' && (
          <Header 
            title="Product Catalog" 
            description="Manage your coffee shop menu and products"
          />
        )}
        {activeSection === 'orders' && (
          <Header 
            title="Order History" 
            description="View and manage customer orders"
          />
        )}
        {activeSection === 'analytics' && (
          <Header 
            title="Sales Analytics" 
            description="Track your business performance and insights"
          />
        )}

        {/* Content Area */}
        <div className={`flex-1 overflow-auto ${activeSection === 'employees' ? '' : 'p-6'}`}>
          {activeSection === 'employees' && <Employee />}
          {/* Render other components based on activeSection here */}
        </div>
      </div>
    </div>
  );
}

export default App;