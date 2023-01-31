import React, { useState } from 'react';

import './MoviesCardList.css';

import { MoviesCard } from '../MoviesCard';

const pageSize = 12;

export function MoviesCardList({ 
  onSaveFilm, 
  onDeleteFilm,
  savedMoviesList,
  moviesForShow
 }) {

  const [currentPage, setNextPage] = useState(0);
  
  function getSavedMovieCard(arr, movie) {
    return arr.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
  }
  
  return (
    <section className="movies-card-list">
      {moviesForShow.length === 0 ? <span className='movies-card-list__nothing'>Ничего не найдено</span> : ''}
      <ul className='movies-card-list__list'>
        {moviesForShow?.slice(0, pageSize + currentPage).map(movie => (
          <MoviesCard
            key={movie.id || movie._id}
            onDeleteFilm={onDeleteFilm}
            onSaveFilm={onSaveFilm}
            saved={getSavedMovieCard(savedMoviesList, movie)}
            movie={movie}
          />
        ))}
      </ul>
      {moviesForShow.length > currentPage + pageSize
        ? 
        <button
            type="button"
            className="movies-card-list__button"
            onClick={() => { 
              if (window.innerWidth <= 768) {
                setNextPage(currentPage + 2);
              } else {
                setNextPage(currentPage + 3); 
              }
              console.log(window.innerWidth); }}
          >
          Ещё
          </button> 
        : null 
      } 
    </section>
  );
};
