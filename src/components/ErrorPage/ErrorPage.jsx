import React from 'react';

import './ErrorPage.css';
import { routerPath } from '../../constants';

import { Link } from 'react-router-dom';

export function ErrorPage() {
    return (
        <div className="error-page">
            <Link to={routerPath.main} className="error-page__link">БЕГИИИИ!!!</Link>
        </div>
    )
};
