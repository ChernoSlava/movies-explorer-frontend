import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';

import { routerPath } from '../../constants';
import { Logo } from '../Logo';
import { useForm } from '../../hooks';

export function Login({ onAuthorization, loggedIn }) {
  const navigation = useNavigate();

  const { values, handleChange, resetForm, errors } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuthorization(values);
  }
  
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const isErrors = errors.email || errors.password;
  const isEmptyValues = !values.password || !values.email;
  const isDisabled = (isErrors || isEmptyValues) ? true : false;
  const isDisabledClass = isDisabled && 'login__btn_disabled';

  const isErrorSpanEmail = errors.email && 'login__field-error_active';
  const isErrorSpanPassw = errors.password && 'login__field-error_active';
  const isErrorInputEmail = errors.email && 'login__input-error';
  const isErrorInputPassw = errors.password && 'login__input-error';

  return (
    <>
      { loggedIn 
      ? navigation(routerPath.main)
      : <section className="login">
          <form className='login__form' onSubmit={handleSubmit} noValidate>
            <div className="login__logo"><Logo /></div>
            <h1 className="login__title">Скорее на борт!</h1>
            <fieldset className="login__fieldset">
              <label htmlFor="email" className='login__label'>
                <span className={`login__field-error ${isErrorSpanEmail}`}>
                  {errors.email}
                </span>
                <p className='login__field'>Космо почта</p>
                <input
                  onChange={handleChange}
                  className={`login__input ${isErrorInputEmail}`}
                  name="email"
                  placeholder="star@mail.ru"
                  type="email"
                  required
                  value={values.email || ""}
                ></input>
              </label>
              <label htmlFor="password" className='login__label'>
                <span className={`login__field-error ${isErrorSpanPassw}`}>
                  {errors.password}
                </span>
                <p className='login__field'>Космо пароль</p>
                <input
                  onChange={handleChange}
                  className={`login__input ${isErrorInputPassw}`}
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
                className={`login__btn ${isDisabledClass}`}                
                disabled={isDisabled}
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
      }
    </>
  );
};
