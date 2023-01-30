import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

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
    ProtectedRoute 
} from './components';
import { routerPath } from './constants';
import { mainApi } from './utils';

export const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [savedMoviesList, setSavedMoviesList] = useState([]);
    const [currentUser, setCurrentUser] = useState({}); 
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        mainApi.setToken(jwt)
        if (jwt) {
            mainApi
                .getUserInfoFromServer()
                .then((data) => {
                    if (data) {
                        setCurrentUser(data)
                        setLoggedIn(true)
                    } else {
                        console.log('Ошибка в проверке токена, пришли не те данные')
                        navigate(routerPath.login);
                    }                   
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                })
        } else {
            setLoading(false);
        } 
    }, []);

    function handleRegistration(data) {
        mainApi
            .register(data)
            .then((res) => {
                !res && !res.data 
                ?
                console.log("Возникла ошибка при регистрации") 
                :
                setCurrentUser(res.data)
                navigate(routerPath.login);
            })
            .catch((err) => {;
                console.log(err);
            });
    };
    function handleAuthorization(data) {
        mainApi
            .login(data)
            .then((res) => {
                !res && !res.token
                ?
                console.log('Возникла ошибка авторизации на борт')
                :
                setLoggedIn(true)
                localStorage.setItem("jwt", res.token)
                navigate(routerPath.main)
                console.log('Добро пожаловать, Космический скиталец');
            })
            .catch((err) => {
                console.log(`Что-то глобально пошло не по плану`, err);
            });
    };

    function handleSignOut() {
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        navigate(routerPath.main);
    };

    function handleChangeProfile({ name, email }) {
        mainApi
            .setUserInfoToServer({ name, email })
                .then((userData) => {
                    setCurrentUser(userData)
                    console.log('ай да молодец, смог изменить имя')
                })
                .catch((err) => {
                    console.log(err)
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
            );
    };
    
    useEffect(() => {
        if (loggedIn && currentUser) {
            mainApi
                .getSavedFilms()
                .then(data => {
                    const personalSavedFilms = data.filter(x => x.owner === currentUser._id);
                    setSavedMoviesList(personalSavedFilms);
                })
                .catch((err) => {
                    console.log(`Не могу получить карточки`, err);
                });
        }
    }, [loggedIn, currentUser])

    return (
        !isLoading &&
        <CurrentUserContext.Provider value={currentUser}>
            <AppLayout>
                {
                <Routes>
                    <Route path={routerPath.main} element={<Main loggedIn={loggedIn} />} />
                    <Route path={routerPath.login} element={<Login onAuthorization={handleAuthorization} />} />
                    <Route path={routerPath.register} element={<Register onRegistration={handleRegistration} />} />
                    <Route
                        path={routerPath.movies}
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
                        path={routerPath.savedMovies}
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
                        path={routerPath.profile}
                        element={(
                            <ProtectedRoute loggedIn={loggedIn}>
                                <Profile loggedIn={loggedIn} handleChangeProfile={handleChangeProfile} handleSignOut={handleSignOut}/>
                            </ProtectedRoute>
                        )}
                    />
                    <Route path={routerPath.alien} element={<ErrorPage />} />
                </Routes>}
            </AppLayout>
        </CurrentUserContext.Provider>
    );
};
