import React from "react";
import { Link } from 'react-router-dom';

import { LogoIco } from './styled';
import ico from '../../images/Logo.svg';
import { ROUTER_PATH, LOGO } from '../../constants';

export const Logo = () => {
    return (
        <Link
            to={ROUTER_PATH.MAIN}
            aria-label={LOGO.ARIAL_LABEL}
        >
            <LogoIco
                src={ico}
                alt={LOGO.LOGO_ALT} 
            />
        </Link>
    );
};
