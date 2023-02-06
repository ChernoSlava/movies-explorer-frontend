import React from 'react';

import { HeaderStyled } from './styled';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';

export function Header({ loggedIn }) {
  return (
    <HeaderStyled>
      <Logo />
      <Navigation loggedIn={loggedIn} />
    </HeaderStyled>
  );
};
