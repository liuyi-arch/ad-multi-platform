import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('main.tsx is executing');
const rootElement = document.getElementById('root');
console.log('rootElement:', rootElement);
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
