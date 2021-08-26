class MoviesApi {
  constructor(options) {
    this._options = options;
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

  getMovies = () => {
    return fetch(`${this._baseUrl}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._handleResult);
  };

  _handleResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
