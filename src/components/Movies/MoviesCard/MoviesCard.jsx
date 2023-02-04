import React from 'react';

import './MoviesCard.css';

import { useLocation } from 'react-router-dom';
import { ROUTER_PATH } from '../../../constants';

export function MoviesCard({ movie, saved, onSaveFilm, onDeleteFilm }) {
  const location = useLocation();

  function handleLike() {
    onSaveFilm(movie);
  }

  function handleDelete() {
    onDeleteFilm(movie);
  }

  function transformDuration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    if (hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  const savedClass = 'movies-card__button_type_saved';

  return (
    <li className="movies-card">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer" className='movies-card__trailer'><img className="movies-card__poster" alt={movie.nameRU} src={movie.image} /></a>
      <div className="movies-card__info">
        <div className="movies-card__text-container">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <h3 className="movies-card__time">{transformDuration(movie.duration)}</h3>
        </div>
        {location.pathname === ROUTER_PATH.MOVIES && (
          <button
            type='button'
            className={`movies-card__button ${saved ? savedClass : ''}`}
            onClick={saved ? handleDelete : handleLike}
          />
        )}
        {location.pathname === ROUTER_PATH.SAVED_MOVIES && (
          <button
            className={`movies-card__button movies-card__button_type_delete`}
            onClick={handleDelete}
          />
        )}
      </div>
    </li>
  );
};
