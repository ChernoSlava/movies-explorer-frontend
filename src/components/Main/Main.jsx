import React from 'react';

import './Main.css';

import { Header, Footer } from '..';

export function Main({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <div className="main">
        
        Я есть Main
        
      </div>
      <Footer />
    </>
  );
};
