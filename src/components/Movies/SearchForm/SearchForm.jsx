import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTER_PATH } from '../../../constants';
import { useForm } from '../../../hooks';
import { CurrentUserContext } from '../../contexts';

import './SearchForm.css';

export function SearchForm({ onSubmit, handleShortMovies, shortMovies }) {
  const location = useLocation();
  const { email } = useContext(CurrentUserContext);

  const { values, handleChange, isEmptiness, setIsEmptiness } = useForm({});
  const [emptySearch, setEmptySearch] = useState('');

  const textError = 'Нужно ввести ключевое слово.';

  const savedMoviesLocation = location.pathname === ROUTER_PATH.SAVED_MOVIES;
  const spanContainer = !savedMoviesLocation && emptySearch;
  const checkbox = 'box';

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isEmptiness) {
      onSubmit(values.film);
    } else {
      setEmptySearch(textError);
    }
    // isEmptiness ? onSubmit(values.film) : setEmptySearch(textError);
  }

  useEffect(() => {
    if (
      location.pathname === ROUTER_PATH.MOVIES &&
      localStorage.getItem(`${email} - movieSearch`)
    ) {
      const searchValue = localStorage.getItem(`${email} - movieSearch`);
      values.film = searchValue;
      setIsEmptiness(true);
    }
  }, [email]);

  useEffect(() => {
    setEmptySearch('');
  }, [isEmptiness]);

  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
        <fieldset className="search-form__field">
          <span className="search-form__field-error">{spanContainer}</span>
          <input
            type="text"
            placeholder="Фильм"
            name="film"
            minLength={1}
            className="search-form__input"
            id="film"
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
        <div className="search-form__checkbox-container">
          <label
            className={`search-form__checkbox-label 
              ${!!shortMovies && 'search-form__checkbox-label_checked'}`}
            htmlFor={checkbox}>
            <input
              type="checkbox"
              name="checkbox"
              id={checkbox}
              onChange={handleShortMovies}
              checked={!!shortMovies}
              className="search-form__checkbox"
            />
          </label>
          <p className="search-form__text">Короткометражки</p>
        </div>
      </form>
    </div>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleShortMovies: PropTypes.func.isRequired,
  shortMovies: PropTypes.bool.isRequired,
};
