import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorPageStyled, ErrorPageBtn } from './styled';

export function ErrorPage() {
    const navigate = useNavigate();
    const back = () => navigate(-1);

    return (
        <ErrorPageStyled>
            <ErrorPageBtn onClick={back}>⚠ БЕГИИИИ!!! ⚠</ErrorPageBtn>
        </ErrorPageStyled>
    )
};
