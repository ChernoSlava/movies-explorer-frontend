import React from 'react';

import './Header.css';

import { Logo } from '../Logo';
import { Navigation } from '../Navigation';

export function Header({ loggedIn }) {
  return (
    <div className='header'>
      <Logo />
      <Navigation loggedIn={loggedIn} />
    </div>
  );
};
