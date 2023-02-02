import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.css';

import { MoviesCard } from '../MoviesCard';
import { routerPath } from '../../../constants';

export function MoviesCardList({ 
  onSaveFilm, 
  onDeleteFilm,
  savedMoviesList,
  moviesForShow,
  isNothing
 }) {
  const location = useLocation();

  const [currentPage, setNextPage] = useState(0);
  const [sizeScreen, setSizeSreen] = useState({ width: window.innerWidth });
  const [pageSize, setPageSize] = useState(0);


  const isNothingText = isNothing && <span className='movies-card-list__nothing'>Ничего не найдено</span>;
  const isMoviesLocation = location.pathname === routerPath.movies;
  const isMovies = isMoviesLocation && moviesForShow.length > currentPage + pageSize;
  
  function getSavedMovieCard(arr, movie) {
    return arr.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
  }
  const takeWidthScreen = () => {
    setSizeSreen({
      width: window.innerWidth
    })
  }

  useEffect(() => {
    window.addEventListener('resize', takeWidthScreen)

    return() => {
      window.removeEventListener('resize', takeWidthScreen)
    }
  }, [sizeScreen]);

  useEffect(() => {
    let win = sizeScreen.width;
    if (win > 800) {
      setPageSize(12);
    } else if (win > 540) {
      setPageSize(8);
    }
    else {
      setPageSize(5);
    }
  }, [sizeScreen.width])
  
  return (
    <section className="movies-card-list">
      {isNothingText}
      <ul className='movies-card-list__list'>
        {(isMoviesLocation ? moviesForShow?.slice(0, pageSize + currentPage) : moviesForShow).map(movie => (
          <MoviesCard
            key={movie.id || movie._id}
            onDeleteFilm={onDeleteFilm}
            onSaveFilm={onSaveFilm}
            saved={getSavedMovieCard(savedMoviesList, movie)}
            movie={movie}
          />
        ))}
      </ul>
      {isMovies
        ? 
        <button
            type="button"
            className="movies-card-list__button"
            onClick={() => { 
              if (sizeScreen.width <= 800) {
                setNextPage(currentPage + 2);
              } else {
                setNextPage(currentPage + 3); 
              }
            }}
          >
          Ещё
          </button> 
        : null 
      } 
    </section>
  );
};
