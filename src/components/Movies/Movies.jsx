import React, { useState, useContext, useEffect } from 'react';

import './Movies.css';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { SearchForm } from './SearchForm';
import { MoviesCardList } from './MoviesCardList';
import { Loader } from './Preloader';
import { moviesApi } from '../../utils';

import { CurrentUserContext } from '../contexts';


export function Movies({ 
  loggedIn, 
  onSaveFilm, 
  onDeleteFilm, 
  savedMoviesList,
  }) {
  const user = useContext(CurrentUserContext);

  const [isLoading, setIsLoading] = useState(false)
  const [moviesFromSearch, setMoviesFromSearch] = useState([]);
  const [shortMovies, setShortMovies] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  
  function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40);
  }
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
  function transformMovies(movies) {
    movies.forEach(movie => {
      if (!movie.image) {
        movie.image = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80';
        movie.thumbnail = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80';
      } else {
        movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
        movie.image = `https://api.nomoreparties.co${movie.image.url}`
      }
      if (!movie.country) {
        movie.country = 'Russia';
      }
      if (!movie.nameEN) {
        movie.nameEN = movie.nameRU;
      }
      if (!movie.nameRU) {
        movie.nameRU = movie.nameEN;
      }
    });
    return movies
  }
  
  function handleAnswerMovies(movies, searchData, checkbox) {
    const moviesBlock = filterMovies(movies, searchData)
    if (moviesBlock.length === 0) {
      console.log('Таких архивов не найдено')
    }
    setMoviesFromSearch(moviesBlock);
    setFilteredMovies(
      checkbox ? filterShortMovies(moviesBlock) : moviesBlock
    )
    localStorage.setItem(
      `${user.email} - movies`,
      JSON.stringify(moviesBlock)
    );
  }

  function handleSearch(value, isShortMovies) {
    setIsLoading(true);
    localStorage.setItem(`${user.email} - movieSearch`, value);
    localStorage.setItem(`${user.email} - shortMovies`, shortMovies);
      moviesApi
        .getAllMovies()
        .then(movies => {
            handleAnswerMovies(
              transformMovies(movies),
              value,
              isShortMovies,
            )
        })
        .catch(() => {
          console.log('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        })
        .finally(() => {
          setIsLoading(false);
        })
  }

  function handleShortMovies() {
    setShortMovies(!shortMovies);
    !shortMovies 
      ? setFilteredMovies(filterShortMovies(moviesFromSearch))
      : setFilteredMovies(moviesFromSearch);

    localStorage.setItem(`${user.email} - shortMovies`, !shortMovies);
  }

  useEffect(() => {
    const isShortMovies = localStorage.getItem(`${user.email} - shortMovies`) === 'true';
    setShortMovies(isShortMovies);
    const searchValue = localStorage.getItem(`${user.email} - movieSearch`);
    if (searchValue) {
      handleSearch(searchValue, isShortMovies);
    }
  }, [user]);

  return (
  <>
    {isLoading && <Loader />}
    <Header loggedIn={loggedIn} />
    <section className="movies">
        <SearchForm 
          onSubmit={(value) => handleSearch(value, shortMovies)} 
          handleShortMovies={handleShortMovies}
          shortMovies={shortMovies}
          />
        <MoviesCardList 
          onSaveFilm={onSaveFilm} 
          onDeleteFilm={onDeleteFilm} 
          savedMoviesList={savedMoviesList}
          moviesForShow={filteredMovies}
          />
    </section>
    <Footer />
  </>
  ); 
};
