import React from 'react';

import './Header.css';

import { Logo } from '..';
import { Navigation } from '..';

export function Header({ loggedIn }) {
  return (
    <div className='header'>
      <Logo />
      <Navigation loggedIn={loggedIn} />
    </div>
  );
};
