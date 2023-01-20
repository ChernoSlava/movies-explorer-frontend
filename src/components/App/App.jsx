import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';


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
    <div className='app'>  
      <Routes>
        <Route path={routerPath.main} element={<Main loggedIn={loggedIn} />} />
        <Route path={routerPath.login} element={<Login />} />
        <Route path={routerPath.register} element={<Register />} />
        <Route path={routerPath.movies} element={<Movies loggedIn={loggedIn}/>} />
        <Route path={routerPath.savedMovies} element={<SavedMovies loggedIn={loggedIn}/>} />
        <Route path={routerPath.profile} element={<Profile loggedIn={loggedIn}/>} />
      </Routes>
    </div>
  );
};
