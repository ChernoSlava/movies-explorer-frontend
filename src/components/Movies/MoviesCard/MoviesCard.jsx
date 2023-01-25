import React, { useState, useEffect} from 'react';

import './MoviesCard.css';

import poster from '../../../images/MainIco-min.jpg';

export function MoviesCard({ id, title, time, isSaved, canDelete, onSave }) {

  const [ add, setAdd ] = useState(isSaved);
  useEffect(() => {
    setAdd(isSaved)
  },[isSaved]);

  const savedClass = 'movies-card__button_type_saved';

  return (
    <li className="movies-card">
      <img className="movies-card__poster" alt={title} src={poster} />
      <div className="movies-card__info">
        <div className="movies-card__text-container">
          <h2 className="movies-card__title">{title}</h2>
          <h3 className="movies-card__time">{time}</h3>
        </div>
        {!canDelete
          ? <button
              className={`movies-card__button ${add ? savedClass : ''}`}
              onClick={() => {
                setAdd(!add);
                onSave?.(id);
              }}
            />
          : <button
              className={`movies-card__button movies-card__button_type_delete`}
              onClick={() => {
                setAdd(false);
                onSave?.(id);
              }}
            />
        }
      </div>
    </li>
  );
};
