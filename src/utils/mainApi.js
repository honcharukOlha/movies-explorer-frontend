// export const BASE_URL = 'http://localhost:3000/api';
// export const BASE_URL = 'https://super-movies.nomoredomains.club';

export class MainApi {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      mode: 'no-cors',
      headers: this._headers,
      credentials: 'include',
    }).then(this._handleResult);
  }

  editUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      mode: 'no-cors',
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name, email }),
    }).then(this._handleResult);
  }

  createMovies({ country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId }) {
    return fetch(`${this._baseUrl}/movies`, {
      mode: 'no-cors',
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        nameRU,
        nameEN,
        movieId,
      }),
    }).then(this._handleResult);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      mode: 'no-cors',
      headers: this._headers,
      credentials: 'include',
    }).then(this._handleResult);
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      mode: 'no-cors',
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._handleResult);
  }

  _handleResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new MainApi({
  baseUrl: 'https://super-movies.nomoredomains.club',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
