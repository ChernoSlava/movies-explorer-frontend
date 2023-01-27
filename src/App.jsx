import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Login, Register, Main, Movies, SavedMovies, Profile, AppLayout, ErrorPage, CurrentUserContext, ProtectedRoute } from './components'
import { routerPath } from './constants';
import { mainApi, moviesApi } from './utils';

function getUniqueId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        // eslint-disable-next-line no-mixed-operators
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


export const App = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [films, setFilms] = useState([]);
    const [saved, setSaved] = useState([]);

    const [currentUser, setCurrentUser] = useState({
        name: 'Вячеслав',
        email: 'star@mail.ru'
    });
    
    const navigate = useNavigate();

    const handleCheckToken = () => {
        const jwt = localStorage.getItem("jwt");
        mainApi.setToken(jwt)
        if (jwt) {
            mainApi
                .getUserInfoFromServer()
                .then((data) => {
                    if (data) {
                        setCurrentUser(data)
                        setLoggedIn(true)
                        navigate(routerPath.main);
                    } else {
                        console.log('Ошибка в проверке токена, пришли не те данные')
                        navigate(routerPath.login);
                    }                   
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
           navigate(routerPath.main);
        } 
    };

    useEffect(() => {
        handleCheckToken();

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

    function handleSaveMovie() {};
    function handleDeleteMovie() { };

    useEffect(() => {
        const items = [
            {
                id: getUniqueId(),
                title: 'Чужой близко',
                time: '2 ч',
                isSaved: false,
            },
            {
                id: getUniqueId(),
                title: 'Чужой близко',
                time: '2 ч',
                isSaved: true,
            },
            {
                id: getUniqueId(),
                title: 'Чужой близко',
                time: '2 ч',
                isSaved: false,
            },
            {
                id: getUniqueId(),
                title: 'Чужой близко',
                time: '2 ч',
                isSaved: true,
            },
            {
                id: getUniqueId(),
                title: 'Чужой близко',
                time: '2 ч',
                isSaved: false,
            },
            {
                id: getUniqueId(),
                title: 'Чужой близко',
                time: '2 ч',
                isSaved: true,
            },
            {
                id: getUniqueId(),
                title: 'Чужой близко',
                time: '2 ч',
                isSaved: false,
            },
            {
                id: getUniqueId(),
                title: 'Чужой близко',
                time: '2 ч',
                isSaved: true,
            },
        ];

        setFilms(items);

        setSaved(items.filter(x => x.isSaved).map(x => x.id));
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <AppLayout>
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
                                    films={
                                        films.map(x => ({
                                            ...x,
                                            isSaved: saved.includes(x.id)
                                        }))
                                    }
                                    onSave={(id) => {
                                        saved.find(x => x === id) ? setSaved(saved.filter(x => x !== id)) : setSaved([...saved, id]);
                                    }} />
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path={routerPath.savedMovies}
                        element={(
                            <ProtectedRoute loggedIn={loggedIn}>
                                <SavedMovies 
                                    loggedIn={loggedIn} 
                                    films={films.filter(x => saved.includes(x.id)).map(x => ({
                                    ...x,
                                    canDelete: true,
                                    isSaved: saved.includes(x.id)
                                }))}
                                    onSave={(id) => {
                                        setSaved(saved.filter(x => x !== id));
                                    }} />
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
                </Routes>
            </AppLayout>
        </CurrentUserContext.Provider>
    );
};
