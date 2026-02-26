
import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ToastContainer } from '@repo/ui-components';
import { getRoutes } from './routes';

const AppContent: React.FC = () => {
    const routing = useRoutes(getRoutes());
    return <>{routing}</>;
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppContent />
            <ToastContainer />
        </BrowserRouter>
    );
};

export default App;
