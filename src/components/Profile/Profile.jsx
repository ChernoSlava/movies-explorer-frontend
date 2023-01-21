import React from 'react';

import './Profile.css';

import { Header } from '..';

export function Profile({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile"> 
        <form className='profile__form'>
          <h1 className="profile__title">Привет, космический пират!</h1>
          <fieldset className="profile__fieldset">
            <label htmlFor="name" className='profile__label'>
              <p className='profile__field'>Имя</p>
              <input
                className="profile__input"
                name="name"
                defaultValue="Вячеслав"
                minLength={2}
                type="text"
                required
              ></input>
            </label>
            <div className="profile__border"></div>
            <label htmlFor="email" className='profile__label'>
              <p className='profile__field'>Космо почта</p>
              <input
                className="profile__input"
                name="email"
                defaultValue="star-wolf@gmail.com"
                type="email"
                required
              ></input>
            </label>
            <div className='profile__btn-container'>
              <button type="button" className="profile__btn profile__btn_edit">Изменить хроники</button>
              <button type="button" className="profile__btn profile__btn_exit">Покинуть корабль</button>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
};
