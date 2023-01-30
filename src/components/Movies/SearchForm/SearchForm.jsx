import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './SearchForm.css';

import { useForm } from '../../../hooks';
import { CurrentUserContext } from '../../contexts';
import { routerPath } from '../../../constants';

export function SearchForm({ 
  onSubmit, 
  handleShortMovies, 
  shortMovies 
}) {
  const { values, handleChange } = useForm({});
  
  const location = useLocation();
  const user = useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values.film)
  }
  useEffect(() => {
    if (location.pathname === routerPath.movies && localStorage.getItem(`${user.email} - movieSearch`)) {
      const searchValue = localStorage.getItem(`${user.email} - movieSearch`);
      values.film = searchValue;
    }
    if (location.pathname === routerPath.savedMovies && localStorage.getItem(`${user.email} - movieSearchSaved`)) {
      const searchValue = localStorage.getItem(`${user.email} - movieSearchSaved`);
      values.film = searchValue;
    }
  }, [user]);

  return (
    <div className="search-form">
      <form className='search-form__form' onSubmit={handleSubmit}>
        <fieldset className='search-form__field'>
          <input
            type="text"
            placeholder="Фильм"
            name="film"
            minLength={1}
            className="search-form__input"
            id='film'
            required
            onChange={handleChange}
            value={values.film || ''}
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
            onChange={handleShortMovies}
            checked={shortMovies ? true : false}
            className='search-form__checkbox' 
          />
          <label className="search-form__checkbox-label" htmlFor="checkbox" />
          <p className="search-form__text">Короткометражки</p>
        </div>
      </form>
    </div>
  );
};
