class MainApi {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то упало в _checkResponse: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }

    register(data) {
        return this._request(`${this._url}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),
        });
    }

    login(data) {
        return this._request(`${this._url}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),
        });
    }

    setToken(token) {
        this._headers.Authorization = `Bearer ${ token }`
    }

    getUserInfoFromServer() {
        return this._request(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers,
        });
    }

    setUserInfoToServer({ name, email }) {
        return this._request(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, email }),
        });
    }

    getSavedMovies() {
        return this._request(`${this._url}/movies`, {
            headers: this._headers,
        });
    }
    deleteMovie(id) {
        return this._request(`${this._url}/movies/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        });
    }
}

export const mainApi = new MainApi({
    url:"http://localhost:3001",
    headers: {
        "content-type": "application/json",
        "Authorization": "",
    }
})
