import React, { useState } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Red from './pages/red';
import Gray from './pages/gray';
import Blue from './pages/blue';

const App = () => {
    const [activePage, setActivePage] = useState('Red');

    const handlePageChange = (page) => {
        setActivePage(page);
    };

    const renderCurrentPage = () => {
        switch (activePage) {
            case 'Red':
                return <Red />;
            case 'Gray':
                return <Gray />;
            case 'Blue':
                return <Blue />;
            default:
                return <Red />;
        }
    };
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {/* Main content area */}
            <div style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
                {/* Header on top - fixed, no scroll */}
                <div style={{ 
                    height: '60px', 
                    backgroundColor: '#f8f9fa', 
                    borderBottom: '1px solid #ddd',
                    flexShrink: 0,
                    overflow: 'hidden'
                }}>
                    <Header onPageChange={handlePageChange} activePage={activePage} />
                </div>

                {/* Current page as the main content - scrollable */}
                <div style={{ 
                    flex: 1, 
                    overflow: 'auto',
                    height: 'calc(100vh - 60px)'
                }}>
                    {renderCurrentPage()}
                </div>
            </div>

            {/* Sidebar on the right full screen - fixed, no scroll */}
            <div style={{ 
                width: '20%', 
                backgroundColor: '#f0f0f0', 
                height: '100vh',
                flexShrink: 0,
                overflow: 'hidden'
            }}>
                <Sidebar />
            </div>
        </div>
    );
};

export default App;