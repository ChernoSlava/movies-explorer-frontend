import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Register.css';

import { ROUTER_PATH } from '../../constants';
import { Logo } from '../Logo';
import { useForm } from '../../hooks';

export function Register({ onRegistration, loggedIn, isInquiry }) {
  const navigation = useNavigate();

  const { values, handleChange, resetForm, errors } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistration(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm, isInquiry]);

  const isErrorSpanName = errors.name && 'register__field-error_active';
  const isErrorSpanEmail = errors.email && 'register__field-error_active';
  const isErrorSpanPassw = errors.password && 'register__field-error_active';

  const isErrorInputName = errors.name && 'register__input-error';
  const isErrorInputEmail = errors.email && 'register__input-error';
  const isErrorInputPassw = errors.password && 'register__input-error';

  const isErrors = (errors.name || errors.email || errors.password);
  const isEmptyValues = (!values.name || !values.password || !values.email);
  const isDisabled = (isErrors || isEmptyValues || isInquiry);
  const isDisabledClass = (isDisabled || isInquiry) && 'register__btn_disabled';

  return (
    <>
      {loggedIn
        ? navigation(ROUTER_PATH.MAIN)
        : <section className="register">
          <form className='register__form' onSubmit={handleSubmit} noValidate>
            <div className="register__logo"><Logo /></div>
            <h1 className="register__title">Добро пожаловать!</h1>
            <fieldset className="register__fieldset">
              <label htmlFor="name" className='register__label'>
                <span className={`register__field-error ${isErrorSpanName}`}>
                  {errors.name}
                </span>
                <p className='register__field'>Имя</p>
                <input
                  className={`register__input ${isErrorInputName} ${isInquiry && 'register__input_disabled'}`}
                  name="name"
                  placeholder="Ваше имя"
                  minLength={2}
                  maxLength={40}
                  type="text"
                  required
                  onChange={handleChange}
                  value={values.name || ""}
                  disabled={isInquiry}
                ></input>
              </label>
              <label htmlFor="email" className='register__label'>
                <span className={`register__field-error ${isErrorSpanEmail}`}>
                  {errors.email}
                </span>
                <p className='register__field'>Космо почта</p>
                <input
                  className={`register__input ${isErrorInputEmail} ${isInquiry && 'register__input_disabled'}`}
                  name="email"
                  placeholder="star@mail.ru"
                  type="email"
                  required
                  onChange={handleChange}
                  value={values.email || ""}
                  disabled={isInquiry}
                ></input>
              </label>
              <label htmlFor="password" className='register__label'>
                <span className={`register__field-error ${isErrorSpanPassw}`}>
                  {errors.password}
                </span>
                <p className='register__field'>Космо пароль</p>
                <input
                  className={`register__input ${isErrorInputPassw} ${isInquiry && 'register__input_disabled'}`}
                  name="password"
                  placeholder="Пароль"
                  minLength={6}
                  type="password"
                  required
                  onChange={handleChange}
                  value={values.password || ""}
                  disabled={isInquiry}
                ></input>
              </label>
            </fieldset>
            <div className='register__btn-container'>
              <button
                type="submit"
                className={`register__btn ${isDisabledClass}`}
                disabled={isDisabled}
              >
                Зарегистрироваться
              </button>
              <p className="register__link-text">
                Уже зарегистрированы?
                <Link
                  to={ROUTER_PATH.LOGIN}
                  className="register__link"
                >
                  Взойти на борт
                </Link>
              </p>
            </div>
          </form>
        </section>
      }
    </>
  );
};
