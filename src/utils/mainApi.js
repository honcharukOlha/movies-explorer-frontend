export const BASE_URL = 'https://super-movies.nomoredomains.club';

export class MainApi {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _handleResult(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

      getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(this._handleResult);
      }  

      editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            name: data.name,
          }),
        }).then(this._handleResult);
      } 

      getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(this._handleResult);
      }

      getSavedMovies() {
        return fetch(`${this._baseUrl}/saved-movies`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(this._handleResult);
      }

      saveMovie(movieData) {
        return fetch(`${this._baseUrl}/movies`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movieData),
        }).then(this._handleResult);
      }
      
      deleteMovie(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(this._handleResult);
      }
}

const api = new MainApi({
    baseUrl: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;