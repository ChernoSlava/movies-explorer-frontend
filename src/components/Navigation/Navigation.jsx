import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';

import account  from '../../images/Account.svg';
import { routerPath, navigation }from '../../constants';

export function Navigation({ loggedIn }) {
    
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleToggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <nav className="Navigation">
      <ul className='Navigation__none'>
        {loggedIn && (
          <>
             <Link
                to={routerPath.movies}
                className="Navigation__link Navigation__link_first"
              >
                Фильмы
              </Link>
              <Link
                to={routerPath.savedMovies}
                className="Navigation__link"
              >
                Сохранённые фильмы
              </Link>
          </>
        )}
      </ul>

      <ul className='Navigation__list'>
        {!loggedIn && (
          <>
            <li>
              <Link
                to={routerPath.register}
                className="Navigation__link Navigation__link_mini"
              >
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to={routerPath.login}
                className=" Navigation__link Navigation__link_mini Navigation__btn"
              >
                Войти
              </Link>
            </li>
          </>
        )}
        {loggedIn && (
          <li className='Navigation__none'>
            <Link
              to={routerPath.profile}
              className="Navigation__link Navigation__link_profile"
            >
              Аккаунт
              <img src={account} alt={navigation.icoAccountAlt}  className='Navigation__link_ico'/>
            </Link>
          </li>
        )}
      </ul>
      {loggedIn && (
        <button
            className= "Navigation__burger-btn"
            type={navigation.burgerBtnType}
            aria-label={navigation.ariaLabelBtnBurger}
            onClick={handleToggleMenu}
        />
      )}
      {loggedIn && (
        <div className={`Navigation__sidebar ${menuIsOpen? "Navigation__sidebar_opened" : ''}`} >
          <div className='Navigation__sidebar-container'>
            <button className="Navigation__close-btn" onClick={handleToggleMenu}></button>
            <ul className='Navigation__sidebar-menu'>
                <li className='Navigation__sidebar-list-element'>
                  <Link
                    to={routerPath.main}
                    className="Navigation__sidebar-link"
                  >
                    Главгая
                </Link>
                </li>
                <li className='Navigation__sidebar-list-element'>
                  <Link
                    to={routerPath.movies}
                    className="Navigation__sidebar-link Navigation__sidebar-link_active"
                  >
                    Фильмы
                </Link>
                </li>
                <li className='Navigation__sidebar-list-element'>
                  <Link
                    to={routerPath.savedMovies}
                    className="Navigation__sidebar-link"
                  >
                    Сохранённые фильмы
                </Link>
                </li>
            </ul>
            <div className='Navigation__sidebar-profile'>

                  <Link
                    to={routerPath.profile}
                    className="Navigation__sidebar-link Navigation__sidebar-link-profile"
                    // onClick={}
                  >
                    Аккаунт
                    <img src={account} alt={navigation.icoAccountAlt}  className='Navigation__link_ico'/>
                  </Link>

            </div>
          </div>
        </div>
      
      )}
      
    </nav>
  );
};
