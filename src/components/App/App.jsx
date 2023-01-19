import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import styles from './App.module.css';


import { Header } from '../Header';
import { Footer } from '../Footer';
import { Login } from '../Login';
import { Register } from '../Register';
import { Main } from '../Main';
import { Movies } from '../Movies';
import { SavedMovies } from '../SavedMovies';
import { Profile } from '../Profile';

import { routerPath } from '../../constants';

export const App = () => {

   const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className={styles.App}>
      <Header loggedIn={loggedIn} />
      
      <Routes>
        <Route path={routerPath.main} element={<Main />} />
        <Route path={routerPath.login} element={<Login />} />
        <Route path={routerPath.register} element={<Register />} />
        <Route path={routerPath.movies} element={<Movies />} />
        <Route path={routerPath.savedMovies} element={<SavedMovies />} />
        <Route path={routerPath.profile} element={<Profile />} />
      </Routes>

      <Footer />

    </div>
  );
};
