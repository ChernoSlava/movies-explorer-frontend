import React, { useState } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';

import './Navigation.css';

import account from '../../images/Account.svg';
import { ROUTER_PATH, NAVIGATION, LINK } from '../../constants';

export function Navigation({ loggedIn }) {
  const location = useLocation();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleToggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }
  const setActiveSideBar = ({ isActive }) => isActive ? LINK.NAV_ACTIVE_BAR_LINK : LINK.NAV_STANDART_BAR_LINK;
  const setActiveForMovies = location.pathname === ROUTER_PATH.MOVIES ? LINK.NAV_ACTIVE_LINK : LINK.NAV_STANDART_LINK;
  const setActiveForSavedMovies = location.pathname === ROUTER_PATH.SAVED_MOVIES ? LINK.NAV_ACTIVE_LINK : LINK.NAV_STANDART_LINK;
  const setActiveMenu = menuIsOpen && "navigation__sidebar_opened";

  return (
    <nav className="navigation">
      <ul className='navigation__none'>
        {loggedIn && (
          <>
            <Link
              to={ROUTER_PATH.MOVIES}
              className={`navigation__link-first ${setActiveForMovies}`}
            >
              Фильмы
            </Link>
            <Link
              to={ROUTER_PATH.SAVED_MOVIES}
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
                to={ROUTER_PATH.REGISTER}
                className="navigation__link navigation__link_mini"
              >
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to={ROUTER_PATH.LOGIN}
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
              to={ROUTER_PATH.PROFILE}
              className="navigation__link navigation__link_profile"
            >
              Аккаунт
              <img src={account} alt={NAVIGATION.ICO_ACCOUNT_ALT} className='navigation__link-ico' />
            </Link>
          </li>
        )}
      </ul>
      {loggedIn && (
        <button
          className="navigation__burger-btn"
          type={NAVIGATION.BURGER_BTN_TYPE}
          aria-label={NAVIGATION.ARIA_LABEL_BTN_BURGER}
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
                  to={ROUTER_PATH.MAIN}
                  className={setActiveSideBar}
                >
                  Главгая
                </NavLink>
              </li>
              <li className='navigation__sidebar-list-element'>
                <NavLink
                  to={ROUTER_PATH.MOVIES}
                  className={setActiveSideBar}
                >
                  Фильмы
                </NavLink>
              </li>
              <li className='navigation__sidebar-list-element'>
                <NavLink
                  to={ROUTER_PATH.SAVED_MOVIES}
                  className={setActiveSideBar}
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
            <div className='navigation__sidebar-profile'>
              <Link
                to={ROUTER_PATH.PROFILE}
                className="navigation__sidebar-link navigation__sidebar-link-profile"
              >
                Аккаунт
                <img src={account} alt={NAVIGATION.ICO_ACCOUNT_ALT} className='navigation__link-ico' />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
