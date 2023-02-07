import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTER_PATH } from '../../../constants';

import './MoviesCard.css';

export function MoviesCard({ movie, saved, onSaveFilm, onDeleteFilm }) {
  const location = useLocation();

  const handleLike = () => {
    onSaveFilm(movie);
  };

  const handleDelete = () => {
    onDeleteFilm(movie);
  };

  function transformDuration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    if (hours === 0) {
      return `${minutes}м`;
    }
    return `${hours}ч ${minutes}м`;
  }

  const savedClass = 'movies-card__button_type_saved';

  return (
    <li className="movies-card">
      <a
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
        className="movies-card__trailer">
        <img
          className="movies-card__poster"
          alt={movie.nameRU}
          src={movie.image}
        />
      </a>
      <div className="movies-card__info">
        <div className="movies-card__text-container">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <h3 className="movies-card__time">
            {transformDuration(movie.duration)}
          </h3>
        </div>
        {location.pathname === ROUTER_PATH.MOVIES && (
          <button
            type="button"
            aria-label="like"
            className={`movies-card__button ${saved ? savedClass : ''}`}
            onClick={saved ? handleDelete : handleLike}
          />
        )}
        {location.pathname === ROUTER_PATH.SAVED_MOVIES && (
          <button
            type="button"
            aria-label="dislike"
            className="movies-card__button movies-card__button_type_delete"
            onClick={handleDelete}
          />
        )}
      </div>
    </li>
  );
}

MoviesCard.propTypes = {
  movie: PropTypes.object.isRequired,
  saved: PropTypes.object,
  onSaveFilm: PropTypes.func,
  onDeleteFilm: PropTypes.func.isRequired,
};
MoviesCard.defaultProps = {
  onSaveFilm: () => {},
  saved: undefined,
};
// saved: PropTypes.objectOf(
//   shape({
//     country: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     director: PropTypes.string.isRequired,
//     duration: PropTypes.number.isRequired,
//     image: PropTypes.string.isRequired,
//     movieId: PropTypes.number.isRequired,
//     nameEN: PropTypes.string.isRequired,
//     nameRU: PropTypes.string.isRequired,
//     owner: PropTypes.string.isRequired,
//     thumbnail: PropTypes.string.isRequired,
//     trailerLink: PropTypes.string.isRequired,
//     year: PropTypes.string.isRequired,
//     __v: PropTypes.number.isRequired,
//     _id: PropTypes.string.isRequired,
//   }),
// )
