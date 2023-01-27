import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

import { routerPath } from '../../constants';
import { Logo } from '../Logo';
import { useForm } from '../../hooks';

export function Register({ onRegistration }) {
  const { values, handleChange } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistration(values);
  }
  return (
    <section className="register">
      <form className='register__form' onSubmit={handleSubmit}>
        <div className="register__logo"><Logo /></div>
          <h1 className="register__title">Добро пожаловать!</h1>
          <fieldset className="register__fieldset">
            <label htmlFor="name" className='register__label'>
              <p className='register__field'>Имя</p>
              <input
                className="register__input"
                name="name"
                placeholder="Ваше имя"
                minLength={2}
                maxLength={40}
                type="text"
                required
                onChange={handleChange}
                value={values.name || ""}
              ></input>
              <span
                className="register__field-error"
              >
                Ошибочка вышла... измените имя!!!
              </span>
            </label>
            <label htmlFor="email" className='register__label'>
              <p className='register__field'>Космо почта</p>
              <input
                className="register__input"
                name="email"
                placeholder="star@mail.ru"
                type="email"
                required
                onChange={handleChange}
                value={values.email || ""}
              ></input>
              <span
                className="register__field-error"
              >
                Ошибочка вышла... измените почту!!!
              </span>
            </label>
            <label htmlFor="password" className='register__label'>
              <p className='register__field'>Космо пароль</p>
              <input
                className="register__input register__input-error"
                name="password"
                placeholder="Пароль"
                minLength={6}
                type="password"
                required
                onChange={handleChange}
                value={values.password || ""}
              ></input>
              <span
                className="register__field-error register__field-error_opened"
              >
                Наш техножрец ничего не разобрал, пожалуйста используейте руки!!!
              </span>
            </label>
          </fieldset>
        <div className='register__btn-container'>
          <button type="submit" className="register__btn">Зарегистрироваться</button>
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
