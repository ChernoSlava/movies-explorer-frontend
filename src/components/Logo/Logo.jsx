import React from "react";
import { Link } from 'react-router-dom';

import './Logo.css';

import ico from '../../images/Logo.svg';
import { routerPath, logo } from '../../constants';

export const Logo = () => {
    return (
        <Link
            className='logo'
            to={routerPath.main}
            aria-label={logo.ariaLabel}
        >
            <img
                className='logo__ico'
                src={ico}
                alt={logo.logoAlt} />
        </Link>  
    );
};
