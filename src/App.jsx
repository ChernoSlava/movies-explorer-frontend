import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Loader } from './components/Movies/Preloader';
import {
  AppLayout,
  CurrentUserContext,
  ErrorPage,
  Login,
  Main,
  Movies,
  Profile,
  ProtectedRoute,
  Register,
  SavedMovies,
} from './components';
import { ROUTER_PATH } from './constants';
import { baseTheme } from './theme';
import { mainApi } from './utils';

export function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginProcess, setLoginProcess] = useState(false);
  const [isRegisterProcess, setRegisterProcess] = useState(false);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [user, setUser] = useState({});
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [text, setText] = useState('Норм');

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    mainApi.setToken(jwt);
    if (jwt) {
      mainApi
        .getUserInfoFromServer()
        .then(data => {
          if (data) {
            setUser(data);
            setLoggedIn(true);
          } else {
            console.log('Ошибка в проверке токена, пришли не те данные');
            navigate(ROUTER_PATH.LOGIN);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const handlePopupIsOpen = () => {
    setPopupIsOpen(true);
  };
  const handleClosePopup = () => {
    setPopupIsOpen(false);
  };
  const handleAuthorization = data => {
    setLoginProcess(true);
    mainApi
      .login(data)
      .then(res => {
        setIsSuccess(true);
        if (res && res.token) {
          setLoggedIn(true);
        }
        localStorage.setItem('jwt', res.token);
        navigate(ROUTER_PATH.MOVIES);
        console.log('Добро пожаловать, Космический скиталец');
        setText('Добро пожаловать');
      })
      .catch(err => {
        setIsSuccess(false);
        setText('Ошибка с авторизацией');
        console.log(`Что-то глобально пошло не по плану`, err);
      })
      .finally(() => {
        handlePopupIsOpen();
        setLoginProcess(false);
      });
  };
  const handleRegistration = data => {
    setRegisterProcess(true);
    const { email, password } = data;
    mainApi
      .register(data)
      .then(res => {
        setIsSuccess(true);
        if (res._id) {
          setUser(res.data);
        }
        handleAuthorization({ email, password });
        setText('Добро пожаловать');
      })
      .catch(err => {
        console.log(err);
        setIsSuccess(false);
        setText('Ошибка с регистрацией');
      })
      .finally(() => {
        handlePopupIsOpen();
        setRegisterProcess(false);
      });
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setIsLoading(true);
    setSavedMoviesList([]);
    setUser({});
    setPopupIsOpen(false);
    setIsSuccess(true);
    setText('Норм');
    setRegisterProcess(false);
    setLoginProcess(false);

    localStorage.clear();

    navigate(ROUTER_PATH.MAIN);
  };

  const handleChangeProfile = ({ name, email }) => {
    mainApi
      .setUserInfoToServer({ name, email })
      .then(userData => {
        setIsSuccess(true);
        setUser(userData);
        setText('Данные изменены');
        console.log('ай да молодец, смог изменить имя');
      })
      .catch(err => {
        setIsSuccess(false);
        console.log(err);
        setText('Ошибочка вышла');
      })
      .finally(() => {
        handlePopupIsOpen();
      });
  };

  const handleSaveFilm = film => {
    mainApi
      .saveNewFilm(film)
      .then(newFilm => setSavedMoviesList([...savedMoviesList, newFilm]))
      .catch(err =>
        console.log('При сохранении фильма произошла какая-то ошибка', err),
      );
  };

  const handleDeleteFilm = film => {
    const savedFilm = savedMoviesList.find(
      x => x.movieId === film.id || x.movieId === film.movieId,
    );
    mainApi
      .deleteFilm(savedFilm._id)
      .then(() => {
        const newSavedFilms = savedMoviesList.filter(x => {
          if (film.id === x.movieId || film.movieId === x.movieId) {
            return false;
          }
          return true;
        });
        setSavedMoviesList(newSavedFilms);
      })
      .catch(err =>
        console.log('При удалении фильма произошла какая-то ошибка', err),
      );
  };

  useEffect(() => {
    if (loggedIn && user) {
      mainApi
        .getSavedFilms()
        .then(data => {
          const personalSavedFilms = data.filter(x => x.owner === user._id);
          setSavedMoviesList(personalSavedFilms);
        })
        .catch(err => {
          console.log(`Не могу получить карточки`, err);
        });
    }
  }, [loggedIn, user]);

  return (
    <ThemeProvider theme={baseTheme}>
      {isLoading ? (
        <Loader />
      ) : (
        <CurrentUserContext.Provider value={user}>
          <Routes>
            <Route
              path={ROUTER_PATH.MAIN}
              element={
                <AppLayout
                  isOpen={popupIsOpen}
                  onClose={handleClosePopup}
                  isSuccess={isSuccess}
                  text={text}
                />
              }>
              <Route index element={<Main loggedIn={loggedIn} />} />
              <Route
                path={ROUTER_PATH.LOGIN}
                element={
                  <Login
                    onAuthorization={handleAuthorization}
                    loggedIn={loggedIn}
                    isInquiry={isLoginProcess}
                  />
                }
              />
              <Route
                path={ROUTER_PATH.REGISTER}
                element={
                  <Register
                    onRegistration={handleRegistration}
                    loggedIn={loggedIn}
                    isInquiry={isRegisterProcess}
                  />
                }
              />
              <Route
                path={ROUTER_PATH.MOVIES}
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Movies
                      loggedIn={loggedIn}
                      onSaveFilm={handleSaveFilm}
                      onDeleteFilm={handleDeleteFilm}
                      savedMoviesList={savedMoviesList}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTER_PATH.SAVED_MOVIES}
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <SavedMovies
                      loggedIn={loggedIn}
                      onDeleteFilm={handleDeleteFilm}
                      savedMoviesList={savedMoviesList}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTER_PATH.PROFILE}
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Profile
                      loggedIn={loggedIn}
                      handleChangeProfile={handleChangeProfile}
                      handleSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path={ROUTER_PATH.ALIEN} element={<ErrorPage />} />
            </Route>
          </Routes>
        </CurrentUserContext.Provider>
      )}
    </ThemeProvider>
  );
}
