import React from 'react';

import './Main.css';

import { Header, Footer } from '..'
import { Promo, AboutProject, Techs, AboutMe, Portfolio } from '.';

export function Main({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <Promo/>
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
};
