
import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { getRoutes } from './routes';
import { ToastContainer } from '@repo/ui-components';
import WebSocketManager from './components/WebSocketManager';

const AppContent: React.FC = () => {
    const routing = useRoutes(getRoutes());
    return <>{routing}</>;
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <WebSocketManager />
            <AppContent />
            <ToastContainer />
        </BrowserRouter>
    );
};

export default App;
