import React, { useEffect, useState, useContext } from 'react';

import './Profile.css';

import { Header } from '../Header';
import { CurrentUserContext } from '../contexts';

export function Profile({ loggedIn, handleChangeProfile, handleSignOut }) {
  const user = useContext(CurrentUserContext);
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user.name, user.email]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleChangeProfile({name, email});
  }


  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile"> 
        <form className='profile__form' onSubmit={handleSubmit}>
          <h1 className="profile__title">Добро пожаловать, уважаемый {name}!</h1>
          <fieldset className="profile__fieldset">
            <label htmlFor="name" className='profile__label'>
              <p className='profile__field'>Имя</p>
              <input
                className="profile__input"
                name="name"
                minLength={2}
                type="text"
                required
                value={name}
                onChange={handleChangeName}
              ></input>
            </label>
            <div className="profile__border"></div>
            <label htmlFor="email" className='profile__label'>
              <p className='profile__field'>Космо почта</p>
              <input
                className="profile__input"
                name="email"
                type="email"
                required
                value={email}
                onChange={handleChangeEmail}
              ></input>
            </label>
            <div className='profile__btn-container'>
              <button type="submit" className="profile__btn profile__btn_edit">Изменить хроники</button>
              <button type="button" className="profile__btn profile__btn_exit" onClick={handleSignOut}>Покинуть корабль</button>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
};
