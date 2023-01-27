import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Login, Register, Main, Movies, SavedMovies, Profile, AppLayout, ErrorPage, CurrentUserContext, ProtectedRoute } from './components'
import { routerPath } from './constants';
import { mainApi, moviesApi } from './utils';

function getUniqueId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


export const App = () => {

    const [loggedIn, setLoggedIn] = useState(true);
    const [films, setFilms] = useState([]);
    const [saved, setSaved] = useState([]);

    const [currentUser, setCurrentUser] = useState({});
    
    const navigate = useNavigate();

    const handleCheckToken = useCallback(() => {
        const jwt = localStorage.getItem("jwt");
        mainApi.setToken(jwt)
        if (jwt) {
            mainApi
                .getUserInfoFromServer()
                .then((user) => {
                    (user && user.data)
                    ?
                    setCurrentUser(user.data)
                    :
                    setLoggedIn(false);
                    navigate(routerPath.login);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
           navigate(routerPath.main);
           setLoggedIn(false);
        } 
    });

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
                console.log('Возникла ошибка регистрации на борт')
                :
                setLoggedIn(true);
                localStorage.setItem("jwt", res.token);
                handleCheckToken();
                navigate(routerPath.main);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function handleSignOut() {};
    function handleChangeProfile() {};
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
                    <Route path={routerPath.login} element={<Login />} />
                    <Route path={routerPath.register} element={<Register />} />
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
                                <Profile loggedIn={loggedIn} />
                            </ProtectedRoute>
                        )}
                    />
                    <Route path={routerPath.alien} element={<ErrorPage />} />
                </Routes>
            </AppLayout>
        </CurrentUserContext.Provider>
    );
};
