import React from 'react';

import './Profile.css';

import { Header } from '..';

export function Profile({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="Profile">
        <form className='Profile__form'>
          <h1 className="Profile__title">Привет, космический пират!</h1>
          <fieldset className="Profile__fieldset">
            <label htmlFor="name" className='Profile__label'>
              <p className='Profile__field'>Имя</p>
              <input
                className="Profile__input"
                name="name"
                value="Вячеслав"
                minLength={2}
                type="text"
                required
              ></input>
            </label>
            <div className="Profile__border"></div>
            <label htmlFor="email" className='Profile__label'>
              <p className='Profile__field'>Космо почта</p>
              <input
                className="Profile__input"
                name="email"
                value="star-wolf@gmail.com"
                type="email"
                required
              ></input>
            </label>
            <div className='Profile__btn-container'>
              <button type="button" className="Profile__btn Profile__btn_edit">Изменить хроники</button>
              <button type="button" className="Profile__btn Profile__btn_exit">Покинуть корабль</button>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
};
