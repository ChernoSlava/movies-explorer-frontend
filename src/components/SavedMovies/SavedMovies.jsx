import React, { useContext, useEffect, useState } from 'react';
import PropTypes, { objectOf } from 'prop-types';

import { CurrentUserContext } from '../contexts';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { MoviesCardList } from '../Movies/MoviesCardList';
import { SearchForm } from '../Movies/SearchForm';

import './SavedMovies.css';

export function SavedMovies({ loggedIn, onDeleteFilm, savedMoviesList }) {
  const { email } = useContext(CurrentUserContext);

  const [shortMovies, setShortMovies] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showedMovies, setShowedMovies] = useState(savedMoviesList);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);

  const [isNothing, setIsNothing] = useState(false);

  function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40);
  }
  function filterMovies(movies, userSearch) {
    function lower(x) {
      return x.toLowerCase().trim();
    }
    return movies.filter(movie => {
      if (userSearch) {
        const userMovie = lower(userSearch);
        const movieRu = lower(String(movie.nameRU)).indexOf(userMovie) !== -1;
        const movieEn = lower(String(movie.nameEN)).indexOf(userMovie) !== -1;
        const result = movieRu || movieEn;
        return result;
      }
      return true;
    });
  }
  function handleSearchSubmit(inputValue, isShortMovies) {
    setSearchQuery(inputValue);
    localStorage.setItem(`${email} - movieSearchSaved`, inputValue);
    let moviesList = filterMovies(savedMoviesList, inputValue);
    moviesList = isShortMovies ? filterShortMovies(moviesList) : moviesList;
    if (moviesList.length === 0) {
      console.log('Таких фильмов в вашем листе нет');
      setIsNothing(true);
    } else {
      setIsNothing(false);
    }
    setFilteredMovies(moviesList);
  }

  const handleShortMovies = () => {
    let moviesList = filterMovies(savedMoviesList, searchQuery);
    moviesList = !shortMovies ? filterShortMovies(moviesList) : moviesList;
    setFilteredMovies(moviesList);
    setShortMovies(!shortMovies);
    localStorage.setItem(`${email} - shortSavedMovies`, !shortMovies);
  };

  useEffect(() => {
    setShowedMovies(savedMoviesList);
    const items = filterMovies(savedMoviesList, searchQuery);
    setFilteredMovies(shortMovies ? filterShortMovies(items) : items);
  }, [savedMoviesList]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="saved-movies">
        <SearchForm
          onSubmit={value => handleSearchSubmit(value, shortMovies)}
          handleShortMovies={handleShortMovies}
          shortMovies={shortMovies}
        />
        <MoviesCardList
          onDeleteFilm={onDeleteFilm}
          savedMoviesList={savedMoviesList}
          moviesForShow={filteredMovies}
          isNothing={isNothing}
        />
      </section>
      <Footer />
    </>
  );
}

SavedMovies.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onDeleteFilm: PropTypes.func.isRequired,
  savedMoviesList: PropTypes.arrayOf(objectOf).isRequired,
};
