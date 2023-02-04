import React from 'react';
import { Outlet } from 'react-router-dom';

import './AppLayout.css';

import { Popup } from '../Popup';
import { AppLayoutStyled } from './styled';
import { GlobalStyles } from './GlobalStyles';

export const AppLayout = ({ ...props }) => {

  return (
    <>
      <GlobalStyles />
      <AppLayoutStyled>
        <Popup {...props}/>
        <Outlet />
      </AppLayoutStyled>
    </>
  );
};
