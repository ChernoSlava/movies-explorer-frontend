import React from "react";
import { Link } from 'react-router-dom';

import './Logo.css';

import ico from '../../images/Logo.svg';
import { ROUTER_PATH, LOGO } from '../../constants';

export const Logo = () => {
    return (
        <Link
            className='logo'
            to={ROUTER_PATH.MAIN}
            aria-label={LOGO.ARIAL_LABEL}
        >
            <img
                className='logo__ico'
                src={ico}
                alt={LOGO.LOGO_ALT} />
        </Link>
    );
};
