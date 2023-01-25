import React from 'react';

import './AppLayout.css';

export const AppLayout = ({ children = null }) => {
  return (
    <div className='app-layout'>
      {children}
    </div>
  );
};
