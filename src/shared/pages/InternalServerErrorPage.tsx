// NotFoundPage.js o NotFoundPage.jsx

import React from 'react';
import './scss/page.scss'; // Importa el archivo SCSS

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            {' '}
            {/* Aplica la clase de SCSS */}
            <img src="/images/500.png" alt="Not Found" />
        </div>
    );
};

export default NotFoundPage;
