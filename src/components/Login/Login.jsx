import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

import { routerPath } from '../../constants';
import { Logo } from '../Logo';
import { useForm } from '../../hooks';

export function Login({ onAuthorization }) {
  const { values, handleChange } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuthorization(values);
  }
  
  return (
    <section className="login">
      <form className='login__form' onSubmit={handleSubmit}>
        <div className="login__logo"><Logo /></div>
        <h1 className="login__title">Скорее на борт!</h1>
        <fieldset className="login__fieldset">
          <label htmlFor="email" className='login__label'>
            <p className='login__field'>Космо почта</p>
            <input
              onChange={handleChange}
              className="login__input"
              name="email"
              placeholder="star@mail.ru"
              type="email"
              required
              value={values.email || ""}
            ></input>
            <span
              className="login__field-error"
            >
              Не можем отправиться, пока на борту ксеноморф!
            </span>
          </label>
          <label htmlFor="password" className='login__label'>
            <p className='login__field'>Космо пароль</p>
            <input
              onChange={handleChange}
              className="login__input"
              name="password"
              placeholder="Пароль"
              minLength={6}
              type="password"
              required
              value={values.password || ""}
            ></input>
            <span
              className="login__field-error"
            >
              Кажется ксеноморф шифруется...
            </span>
          </label>
        </fieldset>
        <div className='login__btn-container'>
          <button type="submit" className="login__btn">Отправляемся</button>
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
