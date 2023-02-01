import React from 'react';

import './AppLayout.css';

import { Popup } from '../Popup';

export const AppLayout = ({ 
  children = null, 
  isOpen,
  onClose,
  isSuccess,
  text }) => {

  return (
    <div className='app-layout'>
      <Popup isOpen={isOpen} onClose={onClose} text={text} isSuccess={isSuccess} />
      {children}
    </div>
  );
};
