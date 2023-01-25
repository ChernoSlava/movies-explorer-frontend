import React from 'react';

import './Movies.css';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { SearchForm } from './SearchForm';
import { MoviesCardList } from './MoviesCardList';

export function Movies({ loggedIn, films, onSave }) {
  return (
  <>
    <Header loggedIn={loggedIn} />
    <section className="movies">
        <SearchForm />
        <MoviesCardList films={films} onSave={onSave} />
    </section>
    <Footer />
  </>
  ); 
};
