import React from 'react';

import './Main.css';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { Promo } from './Promo';
import { AboutProject } from './AboutProject';
import { Techs } from './Techs';
import { AboutMe } from './AboutMe';
import { Portfolio } from './Portfolio';

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
