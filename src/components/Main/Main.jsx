import React from 'react';

import './Main.css';

import { Header, Footer } from '..';

export function Main({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <div className="Main">
        
        Я есть Main
        
      </div>
      <Footer />
    </>
  );
};
