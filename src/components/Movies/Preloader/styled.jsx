import styled, { keyframes } from 'styled-components/macro';
import { baseTheme } from '../../../theme';

export const PreloaderStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 10;
    position: fixed;
    background-color: ${baseTheme.colors.preloader};
`;

export const PreloaderContainer = styled.div`
    position: relative;
`;

const PreloaderRoundSpin = keyframes`
    from { transform: rotate(0deg) }
    to { transform: rotate(360deg) }    
`;

export const PreloaderRound = styled.div`
    div {
        border: 10px inset #3ddc84;
        border-radius: 100%;
        padding: 4px;
        animation: ${PreloaderRoundSpin} 15s linear infinite;
    }
`;
