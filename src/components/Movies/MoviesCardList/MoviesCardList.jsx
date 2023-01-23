import React, { useState } from 'react';

import './MoviesCardList.css';

import { MoviesCard } from '../MoviesCard';

const pageSize = 4;

export function MoviesCardList({ films, onSave}) {
  const [currentPage, setNextPage] = useState(1);

  return (
    <section className="movies-card-list">
      <ul className='movies-card-list__list'>
        {films?.slice(0, pageSize * currentPage).map((card) => (
          <MoviesCard
            key={card.id}
            id={card.id}
            canDelete={card.canDelete}
            title={card.title}
            time={card.time}
            isSaved={card.isSaved}
            onSave={onSave}
          />
        ))}
      </ul>
      { films.length > currentPage * pageSize 
        ? <button
            type="button"
            className="movies-card-list__button"
            onClick={() => setNextPage(currentPage + 1)}
          >
          Ещё
          </button> 
        : null 
      }
    </section>
  );
};
