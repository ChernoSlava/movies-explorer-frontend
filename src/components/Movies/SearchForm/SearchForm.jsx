import React from 'react';

import './SearchForm.css';

export function SearchForm() {
  return (
    <div className="search-form">
      <form className='search-form__form'>
        <fieldset className='search-form__field'>
          <input
            type="text"
            placeholder="Фильм"
            name="film"
            minLength={2}
            className="search-form__input"
            id='film'
            required
          />
          <button
            type="submit"
            aria-label="Найти"
            className="search-form__button"
          />
        </fieldset>
        <div className='search-form__checkbox-container'>     
          <input 
            type="checkbox" 
            name="checkbox" 
            id="checkbox"
            className='search-form__checkbox' 
          />
          <label className="search-form__checkbox-label" htmlFor="checkbox" />
          <p className="search-form__text">Короткометражки</p>
        </div>
      </form>
    </div>
  );
};
