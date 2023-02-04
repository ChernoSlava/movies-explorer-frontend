import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from "styled-components";

import {
    Login,
    Register,
    Main,
    Movies,
    SavedMovies,
    Profile,
    AppLayout,
    ErrorPage,
    CurrentUserContext,
    ProtectedRoute,
} from './components';
import { ROUTER_PATH } from './constants';
import { mainApi } from './utils';
import { Loader } from './components/Movies/Preloader';
import { baseTheme } from './theme';


export const App = () => {
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
        const jwt = localStorage.getItem("jwt");
        mainApi.setToken(jwt)
        if (jwt) {
            mainApi
                .getUserInfoFromServer()
                .then((data) => {
                    if (data) {
                        setUser(data)
                        setLoggedIn(true)
                    } else {
                        console.log('Ошибка в проверке токена, пришли не те данные')
                        navigate(ROUTER_PATH.LOGIN);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        } else {
            setIsLoading(false);
        }
    }, [navigate]);

    function handlePopupIsOpen() {
        setPopupIsOpen(true);
    }
    function handleClosePopup() {
        setPopupIsOpen(false);
    }

    function handleRegistration(data) {
        setRegisterProcess(true);
        const { email, password } = data;
        mainApi
            .register(data)
            .then((res) => {
                setIsSuccess(true);
                res._id &&
                    setUser(res.data)
                handleAuthorization({ email, password });
                setText('Добро пожаловать');
            })
            .catch((err) => {
                ;
                console.log(err);
                setIsSuccess(false);
                setText('Ошибка с регистрацией')
            })
            .finally(() => {
                handlePopupIsOpen();
                setRegisterProcess(false);
            });
    };
    function handleAuthorization(data) {
        setLoginProcess(true);
        mainApi
            .login(data)
            .then((res) => {
                setIsSuccess(true);
                res && res.token &&
                    setLoggedIn(true);
                localStorage.setItem("jwt", res.token);
                navigate(ROUTER_PATH.MOVIES);
                console.log('Добро пожаловать, Космический скиталец');
                setText('Добро пожаловать');
            })
            .catch((err) => {
                setIsSuccess(false);
                setText('Ошибка с авторизацией');
                console.log(`Что-то глобально пошло не по плану`, err);
            })
            .finally(() => {
                handlePopupIsOpen();
                setLoginProcess(false);
            });
    };

    function handleSignOut() {
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

    function handleChangeProfile({ name, email }) {
        mainApi
            .setUserInfoToServer({ name, email })
            .then((userData) => {
                setIsSuccess(true);
                setUser(userData)
                setText('Данные изменены')
                console.log('ай да молодец, смог изменить имя')
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err)
                setText('Ошибочка вышла')
            })
            .finally(() => {
                handlePopupIsOpen();
            });
    };

    function handleSaveFilm(film) {
        mainApi
            .saveNewFilm(film)
            .then(newFilm => setSavedMoviesList([...savedMoviesList, newFilm]))
            .catch(err =>
                console.log('При сохранении фильма произошла какая-то ошибка', err,)
            );
    }

    function handleDeleteFilm(film) {
        const savedFilm = savedMoviesList.find(
            (x) => x.movieId === film.id || x.movieId === film.movieId
        );
        mainApi
            .deleteFilm(savedFilm._id)
            .then(() => {
                const newSavedFilms = savedMoviesList.filter(x => {
                    if (film.id === x.movieId || film.movieId === x.movieId) {
                        return false;
                    } else {
                        return true;
                    }
                });
                setSavedMoviesList(newSavedFilms)
            })
            .catch(err =>
                console.log('При удалении фильма произошла какая-то ошибка', err,)
            )
    };

    useEffect(() => {
        if (loggedIn && user) {
            mainApi
                .getSavedFilms()
                .then(data => {
                    const personalSavedFilms = data.filter(x => x.owner === user._id);
                    setSavedMoviesList(personalSavedFilms);
                })
                .catch((err) => {
                    console.log(`Не могу получить карточки`, err);
                });
        }
    }, [loggedIn, user]);



    return (
        <>
            {isLoading ?
                <Loader /> :
                <CurrentUserContext.Provider value={user}>
                    <ThemeProvider theme={baseTheme}>
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
                            }
                        >
                            <Route
                                index
                                element={<Main
                                    loggedIn={loggedIn}
                                />}
                            />
                            <Route
                                path={ROUTER_PATH.LOGIN}
                                element={<Login
                                    onAuthorization={handleAuthorization}
                                    loggedIn={loggedIn}
                                    isInquiry={isLoginProcess}
                                />}
                            />
                            <Route
                                path={ROUTER_PATH.REGISTER}
                                element={<Register
                                    onRegistration={handleRegistration}
                                    loggedIn={loggedIn}
                                    isInquiry={isRegisterProcess}
                                />}
                            />
                            <Route
                                path={ROUTER_PATH.MOVIES}
                                element={(
                                    <ProtectedRoute loggedIn={loggedIn}>
                                        <Movies
                                            loggedIn={loggedIn}
                                            onSaveFilm={handleSaveFilm}
                                            onDeleteFilm={handleDeleteFilm}
                                            savedMoviesList={savedMoviesList}
                                        />
                                    </ProtectedRoute>
                                )}
                            />
                            <Route
                                path={ROUTER_PATH.SAVED_MOVIES}
                                element={(
                                    <ProtectedRoute loggedIn={loggedIn}>
                                        <SavedMovies
                                            loggedIn={loggedIn}
                                            onDeleteFilm={handleDeleteFilm}
                                            savedMoviesList={savedMoviesList}
                                        />
                                    </ProtectedRoute>
                                )}
                            />
                            <Route
                                path={ROUTER_PATH.PROFILE}
                                element={(
                                    <ProtectedRoute loggedIn={loggedIn}>
                                        <Profile
                                            loggedIn={loggedIn}
                                            handleChangeProfile={handleChangeProfile}
                                            handleSignOut={handleSignOut}
                                        />
                                    </ProtectedRoute>
                                )}
                            />
                            <Route
                                path={ROUTER_PATH.ALIEN}
                                element={<ErrorPage />}
                            />
                        </Route>
                    </Routes>
                    </ThemeProvider>
                </CurrentUserContext.Provider>
            }
        </>
    );
};
