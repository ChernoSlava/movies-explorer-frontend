import React from 'react';
import { useNavigate } from 'react-router-dom';

import './ErrorPage.css';

export function ErrorPage() {
    const navigate = useNavigate();
    const back = () => navigate(-1);

    return (
        <div className="error-page">
            <button className='error-page__btn' onClick={back}>⚠ БЕГИИИИ!!! ⚠</button>
        </div>
    )
};
