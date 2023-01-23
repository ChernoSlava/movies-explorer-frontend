import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Login, Register, Main, Movies, SavedMovies, Profile, AppLayout, ErrorPage } from './components'
import { routerPath } from './constants';

function getUniqueId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export const App = () => {

    const [loggedIn, setLoggedIn] = useState(true);
    const [films, setFilms] = useState([]);
    const [saved, setSaved] = useState([]);
    
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
        <AppLayout>
            <Routes>
                <Route path={routerPath.main} element={<Main loggedIn={loggedIn} />} />
                <Route path={routerPath.login} element={<Login />} />
                <Route path={routerPath.register} element={<Register />} />
                <Route path={routerPath.movies} element={<Movies
                    loggedIn={loggedIn}
                    films={films.map(x => ({
                        ...x,
                        isSaved: saved.includes(x.id)
                    }))}
                    onSave={(id) => {
                        saved.find(x => x === id) ? setSaved(saved.filter(x => x !== id)) : setSaved([...saved, id]);
                    }} />} />
                <Route path={routerPath.savedMovies} element={<SavedMovies loggedIn={loggedIn} films={films.filter(x => saved.includes(x.id)).map(x => ({
                    ...x,
                    canDelete: true,
                    isSaved: saved.includes(x.id)
                }))}
                    onSave={(id) => {
                        setSaved(saved.filter(x => x !== id));
                    }} />} />
                <Route path={routerPath.profile} element={<Profile loggedIn={loggedIn} />} />
                <Route path={routerPath.alien} element={<ErrorPage />} />
            </Routes>
        </AppLayout>
    );
};
