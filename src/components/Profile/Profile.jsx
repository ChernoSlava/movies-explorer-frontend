import React, { useEffect, useContext } from 'react';

import './Profile.css';

import { Header } from '../Header';
import { CurrentUserContext } from '../contexts';
import { useForm } from '../../hooks';

export function Profile({ loggedIn, handleChangeProfile, handleSignOut }) {
  const user = useContext(CurrentUserContext);
  
  const { values, handleChange, resetForm, errors } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    handleChangeProfile(values);
  }

  useEffect(() => {
    if (user) {
      resetForm(user, {});
    }
  }, [user, resetForm]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile"> 
        <form className='profile__form' onSubmit={handleSubmit}>
          <h1 className="profile__title">Добро пожаловать, уважаемый {user.name}!</h1>
          <fieldset className="profile__fieldset">
            <label htmlFor="name" className='profile__label'>
              <span className='profile__field-error profile__field-error_name'>{errors.name || null}</span>
              <p className='profile__field'>Имя</p>
              <input
                className="profile__input"
                name="name"
                minLength='2'
                maxLength='30'
                type="text"
                required
                value={values.name || ''}
                onChange={handleChange}
              ></input>
            </label>
            <div className="profile__border"></div>
            <label htmlFor="email" className='profile__label'>
              <span className='profile__field-error profile__field-error_email'>{errors.email || null}</span>
              <p className='profile__field'>Космо почта</p>
              <input
                className="profile__input"
                name="email"
                type="email"
                required
                value={values.email || ''}
                onChange={handleChange}
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
