import React, { useState, useEffect, useContext } from 'react';

import './SavedMovies.css';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { SearchForm } from '../Movies/SearchForm';
import { MoviesCardList } from '../Movies/MoviesCardList';
import { CurrentUserContext } from '../contexts';

export function SavedMovies({ loggedIn, onDeleteFilm, savedMoviesList }) {
  const user = useContext(CurrentUserContext);

  const [shortMovies, setShortMovies] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMoviesList); // показываемывые фильмы
  const [filteredMovies, setFilteredMovies] = useState(showedMovies); // отфильтрованные по запросу фильмы

  function filterMovies(movies, userSearch) {
    function lower(x) {
      return x.toLowerCase().trim();
    }
    const filteredMovies = movies.filter((movie) => {
      const userMovie = lower(userSearch);
      const movieRu = lower(String(movie.nameRU)).indexOf(userMovie) !== -1;
      const movieEn = lower(String(movie.nameEN)).indexOf(userMovie) !== -1;
      const result = movieRu || movieEn;
      return result;
    });
    return filteredMovies;
  }
  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue);
    if (moviesList.length === 0) {
      console.log('Таких фильмов в вашей листе нет');
    } else {
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }
  function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40);
  }
  function handleShortMovies() {
    // setShortMovies(!shortMovies);
    if (!shortMovies) {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(filteredMovies));
      localStorage.setItem(`${user.email} - shortSavedMovies`, true);

    } else {
      setShortMovies(false);
      setShowedMovies(filteredMovies);
      localStorage.setItem(`${user.email} - shortSavedMovies`, false);
    }
  }

  useEffect(() => {
    setFilteredMovies(savedMoviesList);
  }, [savedMoviesList]);
  
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="saved-movies">
        <SearchForm 
          handleSearchSubmit={handleSearchSubmit} 
          handleShortMovies={handleShortMovies}
          shortMovies={shortMovies}
        />
        <MoviesCardList 
          onDeleteFilm={onDeleteFilm} 
          savedMoviesList={savedMoviesList}
          moviesForShow={showedMovies}
          />
      </section>
      <Footer />
    </>
  );
};
