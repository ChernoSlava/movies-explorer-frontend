import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import { Login, Register, Main, Movies, SavedMovies, Profile } from '..'
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
