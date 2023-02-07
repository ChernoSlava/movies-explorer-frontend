import React from 'react';
import PropTypes from 'prop-types';

import { Footer } from '../Footer';
import { Header } from '../Header';

import { AboutMe } from './AboutMe';
import { AboutProject } from './AboutProject';
import { Portfolio } from './Portfolio';
import { Promo } from './Promo';
import { Techs } from './Techs';

import './Main.css';

export function Main({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

Main.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};
