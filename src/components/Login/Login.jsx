import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

import { routerPath } from '../../constants';
import { Logo } from '../Logo';
import { useForm } from '../../hooks';
import { Loader } from '../Movies/Preloader';

export function Login({ onAuthorization, isLoading }) {
  const { values, handleChange, resetForm, errors } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuthorization(values);
  }
  
  useEffect(() => {
    resetForm();
  }, [resetForm]);
  let isErrors = (errors.email || errors.password);
  let isEmptyValues = (!values.password || !values.email);
  return (
    <section className="login">
      {isLoading && <Loader />}
      <form className='login__form' onSubmit={handleSubmit} noValidate>
        <div className="login__logo"><Logo /></div>
        <h1 className="login__title">Скорее на борт!</h1>
        <fieldset className="login__fieldset">
          <label htmlFor="email" className='login__label'>
            <span className={`login__field-error ${errors.email && 'login__field-error_active'}`}>
              {errors.email}
            </span>
            <p className='login__field'>Космо почта</p>
            <input
              onChange={handleChange}
              className={`login__input ${errors.email && 'login__input-error'}`}
              name="email"
              placeholder="star@mail.ru"
              type="email"
              required
              value={values.email || ""}
            ></input>
          </label>
          <label htmlFor="password" className='login__label'>
            <span className={`login__field-error ${errors.password && 'login__field-error_active'}`}>
              {errors.password}
            </span>
            <p className='login__field'>Космо пароль</p>
            <input
              onChange={handleChange}
              className={`login__input ${errors.password && 'login__input-error'}`}
              name="password"
              placeholder="Пароль"
              minLength={6}
              type="password"
              required
              value={values.password || ""}
            ></input>
          </label>
        </fieldset>
        <div className='login__btn-container'>
          <button 
            type="submit" 
            className={`login__btn ${(isErrors || isEmptyValues) && 'login__btn_disabled'}`}                
            disabled={(isErrors || isEmptyValues) ? true : false}
          >
            Отправляемся
          </button>
          <p className="login__link-text">
            Ещё не зарегистрированы?
            <Link
              to={routerPath.register}
              className="login__link"
            >
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};
