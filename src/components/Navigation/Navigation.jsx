import React, { useState } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';

import './Navigation.css';

import {
  NavigationStyled,
  NavigationNone,
  NavigationLink,
  NavigationList,
  NavigationLinkIco,
  NavigationListNone,
  NavigationBurgerButton,
  NavigationSidebar,
  NavigationSidebarContainer,
  NavigationCloseButton,
  NavigationSidebardMenu,
  NavigationSidebardList, 
  NavigationSidebarNavLink, 
  NavigationSidebarProfile,
  NavigationSidebarLink

} from './styled';

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
  // const isMini = true;
  // const isBtn = true;
  // const sasa = Boolean;

  return (
    <NavigationStyled className="navigation">
      <NavigationNone className='navigation__none'>
        {loggedIn && (
          <>
            <Link
              to={ROUTER_PATH.MOVIES}
              // first={true}
              // active={setActiveForMovies}
              className={`navigation__link-first ${setActiveForMovies}`}
            >
              Фильмы
            </Link>
            <Link
              to={ROUTER_PATH.SAVED_MOVIES}
              // active={setActiveForSavedMovies}
              className={setActiveForSavedMovies}
            >
              Сохранённые фильмы
            </Link>
          </>
        )}
      </NavigationNone>
      <NavigationList className='navigation__list'>
        {!loggedIn && (
          <>
            <li>
              <Link
                to={ROUTER_PATH.REGISTER}
                // mini={true}
                className="navigation__link navigation__link_mini"
              >
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to={ROUTER_PATH.LOGIN}
                // mini={true}
                // btn={isBtn}
                className="navigation__link navigation__link_mini navigation__btn"
              >
                Войти
              </Link>
            </li>
          </>
        )}
        {loggedIn && (
          <NavigationListNone className='navigation__none'>
            <Link
              to={ROUTER_PATH.PROFILE}
              // profile={true}
              className="navigation__link navigation__link_profile"
            >
              Аккаунт
              <NavigationLinkIco src={account} alt={NAVIGATION.ICO_ACCOUNT_ALT} className='navigation__link-ico' />
            </Link>
          </NavigationListNone>
        )}
      </NavigationList>
      {loggedIn && (
        <NavigationBurgerButton
          className="navigation__burger-btn"
          type={NAVIGATION.BURGER_BTN_TYPE}
          aria-label={NAVIGATION.ARIA_LABEL_BTN_BURGER}
          onClick={handleToggleMenu}
        />
      )}
      {loggedIn && (
        <NavigationSidebar className={`navigation__sidebar ${setActiveMenu}`} active={setActiveMenu}>
          <NavigationSidebarContainer className='navigation__sidebar-container'>
            <NavigationCloseButton className="navigation__close-btn" onClick={handleToggleMenu} />
            <NavigationSidebardMenu className='navigation__sidebar-menu'>
              <NavigationSidebardList className='navigation__sidebar-list-element'>
                <NavLink
                  to={ROUTER_PATH.MAIN}
                  // active={setActiveSideBar}
                  className={setActiveSideBar}
                >
                  Главная
                </NavLink>
              </NavigationSidebardList>
              <NavigationSidebardList className='navigation__sidebar-list-element'>
                <NavLink
                  to={ROUTER_PATH.MOVIES}
                  // active={setActiveSideBar}
                  className={setActiveSideBar}
                >
                  Фильмы
                </NavLink>
              </NavigationSidebardList>
              <NavigationSidebardList className='navigation__sidebar-list-element'>
                <NavLink
                  to={ROUTER_PATH.SAVED_MOVIES}
                  // active={setActiveSideBar}
                  className={setActiveSideBar}
                >
                  Сохранённые фильмы
                </NavLink>
              </NavigationSidebardList>
            </NavigationSidebardMenu>
            <NavigationSidebarProfile className='navigation__sidebar-profile'>
              <NavigationSidebarLink
                to={ROUTER_PATH.PROFILE}
                className="navigation__sidebar-link navigation__sidebar-link-profile"
              >
                Аккаунт
                <img src={account} alt={NAVIGATION.ICO_ACCOUNT_ALT} className='navigation__link-ico' />
              </NavigationSidebarLink>
            </NavigationSidebarProfile>
          </NavigationSidebarContainer>
        </NavigationSidebar>
      )}
    </NavigationStyled>
  );
};
