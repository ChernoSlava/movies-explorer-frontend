import React from 'react';
import { Outlet } from 'react-router-dom';

import './AppLayout.css';

import { Popup } from '../Popup';

export const AppLayout = ({ ...props }) => {

  return (
    <div className='app-layout'>
      <Popup {...props}/>
      <Outlet />
    </div>
  );
};
