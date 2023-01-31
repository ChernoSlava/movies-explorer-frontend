import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

import { routerPath } from '../../constants';
import { Logo } from '../Logo';
import { useForm } from '../../hooks';

export function Register({ onRegistration }) {
  const { values, handleChange, resetForm, errors } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistration(values);
  }

  let isErrors = (errors.name || errors.email || errors.password);
  let isEmptyValues = (!values.name || !values.password || !values.email);
  useEffect(() => {
    resetForm();
  }, [resetForm]);
  return (
    <section className="register">
      <form className='register__form' onSubmit={handleSubmit} noValidate>
        <div className="register__logo"><Logo /></div>
          <h1 className="register__title">Добро пожаловать!</h1>
          <fieldset className="register__fieldset">
            <label htmlFor="name" className='register__label'>
            <span className={`register__field-error ${errors.name && 'register__field-error_active'}`}>
              {errors.name}
            </span>
              <p className='register__field'>Имя</p>
              <input
                className={`register__input ${errors.name && 'register__input-error'}`}
                name="name"
                placeholder="Ваше имя"
                minLength={2}
                maxLength={40}
                type="text"
                required
                onChange={handleChange}
                value={values.name || ""}
              ></input>
            </label>
            <label htmlFor="email" className='register__label'>
            <span className={`register__field-error ${errors.email && 'register__field-error_active'}`}>
              {errors.email}
            </span>
              <p className='register__field'>Космо почта</p>
              <input
                className={`register__input ${errors.email && 'register__input-error'}`}
                name="email"
                placeholder="star@mail.ru"
                type="email"
                required
                onChange={handleChange}
                value={values.email || ""}
              ></input>
            </label>
            <label htmlFor="password" className='register__label'>
            <span className={`register__field-error ${errors.password && 'register__field-error_active'}`}>
              {errors.password}
            </span>
              <p className='register__field'>Космо пароль</p>
              <input
                className={`register__input ${errors.password && 'register__input-error'}`}
                name="password"
                placeholder="Пароль"
                minLength={6}
                type="password"
                required
                onChange={handleChange}
                value={values.password || ""}
              ></input>
            </label>
          </fieldset>
        <div className='register__btn-container'>
          <button 
            type="submit" 
            className={`register__btn ${(isErrors || isEmptyValues) && 'register__btn_disabled'}`}
            disabled={(isErrors || isEmptyValues) ? true : false}
          >
            Зарегистрироваться
          </button>
          <p className="register__link-text">
            Уже зарегистрированы?
            <Link
              to={routerPath.login}
              className="register__link"
            >
              Взойти на борт
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};
