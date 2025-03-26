import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorBoundary: React.FC = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        // Error generado por una respuesta fallida del loader o action
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Error {error.status}</h1>
                <p>{error.statusText}</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Oops!</h1>
            <p>Ocurrió un error.</p>
            <pre style={{ color: 'red' }}>{error instanceof Error ? error.message : 'Error Desconocido'}</pre>
        </div>
    );
};

export default ErrorBoundary;
