import React, { useState } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';

import './Navigation.css';

import account from '../../images/Account.svg';
import { routerPath, navigation, link } from '../../constants';

export function Navigation({ loggedIn }) {
  const location = useLocation();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleToggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }
  const setActiveSideBar = ({ isActive }) => isActive ? link.navActiveBarLink : link.navStandartBarLink;
  const setActiveForMovies = location.pathname === routerPath.movies ? link.navActiveLink : link.navStandartLink;
  const setActiveForSavedMovies = location.pathname === routerPath.savedMovies ? link.navActiveLink : link.navStandartLink;
  const setActiveMenu = menuIsOpen && "navigation__sidebar_opened";

  return (
    <nav className="navigation">
      <ul className='navigation__none'>
        {loggedIn && (
          <>
            <Link
              to={routerPath.movies}
              className={`navigation__link-first ${setActiveForMovies}`}
            >
              Фильмы
            </Link>
            <Link
              to={routerPath.savedMovies}
              className={setActiveForSavedMovies}
            >
              Сохранённые фильмы
            </Link>
          </>
        )}
      </ul>
      <ul className='navigation__list'>
        {!loggedIn && (
          <>
            <li>
              <Link
                to={routerPath.register}
                className="navigation__link navigation__link_mini"
              >
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to={routerPath.login}
                className="navigation__link navigation__link_mini navigation__btn"
              >
                Войти
              </Link>
            </li>
          </>
        )}
        {loggedIn && (
          <li className='navigation__none'>
            <Link
              to={routerPath.profile}
              className="navigation__link navigation__link_profile"
            >
              Аккаунт
              <img src={account} alt={navigation.icoAccountAlt} className='navigation__link-ico' />
            </Link>
          </li>
        )}
      </ul>
      {loggedIn && (
        <button
          className="navigation__burger-btn"
          type={navigation.burgerBtnType}
          aria-label={navigation.ariaLabelBtnBurger}
          onClick={handleToggleMenu}
        />
      )}
      {loggedIn && (
        <div className={`navigation__sidebar ${setActiveMenu}`} >
          <div className='navigation__sidebar-container'>
            <button className="navigation__close-btn" onClick={handleToggleMenu} />
            <ul className='navigation__sidebar-menu'>
              <li className='navigation__sidebar-list-element'>
                <NavLink
                  to={routerPath.main}
                  className={setActiveSideBar}
                >
                  Главгая
                </NavLink>
              </li>
              <li className='navigation__sidebar-list-element'>
                <NavLink
                  to={routerPath.movies}
                  className={setActiveSideBar}
                >
                  Фильмы
                </NavLink>
              </li>
              <li className='navigation__sidebar-list-element'>
                <NavLink
                  to={routerPath.savedMovies}
                  className={setActiveSideBar}
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
            <div className='navigation__sidebar-profile'>
              <Link
                to={routerPath.profile}
                className="navigation__sidebar-link navigation__sidebar-link-profile"
              >
                Аккаунт
                <img src={account} alt={navigation.icoAccountAlt} className='navigation__link-ico' />
              </Link> 
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
