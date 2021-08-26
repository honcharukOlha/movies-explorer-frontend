import './App.css';
import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import * as auth from '../../utils/auth';
import api from '../../utils/mainApi';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useFormWithValidation } from '../../utils/useFormValidation';
const MOVIE_IMG_URL = 'https://api.nomoreparties.co';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [allBeatMovies, setAllBeatMovies] = React.useState([]);
  const [beatMoviesFiltered, setBeatMoviesFiltered] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesFiltered, setSavedMoviesFiltered] = React.useState([]);
  const [shortMovieToggle, setShortMovieToggle] = React.useState(false);
  const [shortMovieToggleSaved, setShortMovieToggleSaved] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [serverError, setServerError] = React.useState('');
  const [moviesLength, setMoviesLength] = React.useState(0);
  const [listLength, setListLength] = React.useState(0);
  const { isValid, values, errors, setErrors, setValues, handleChange, resetForm } = useFormWithValidation();

  // инициализация
  React.useEffect(async () => {
    setBeatMoviesFiltered(JSON.parse(localStorage.getItem('filtered')) ?? []);
    try {
      setIsLoading(true);
      const cachedBeatMovies = JSON.parse(localStorage.getItem('filtered')) ?? [];
      const allSavedMovies = await api.getMovies();
      const allBeatMovies = await moviesApi.getMovies();
      cachedBeatMovies.forEach((item) => (item.isLiked = allSavedMovies.some((i) => i.movieId === item.id)));
      setBeatMoviesFiltered(cachedBeatMovies);
      setAllBeatMovies(allBeatMovies);
      setSavedMovies(allSavedMovies);
      setSavedMoviesFiltered(allSavedMovies);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loggedIn]);

  // слушатель изменения размеров окна
  React.useEffect(() => {
    defineListMoviesLength();
    window.addEventListener('resize', defineListMoviesLength);
    window.addEventListener('hashchange', resetForm);
    return () => {
      window.removeEventListener('resize', defineListMoviesLength);
      window.removeEventListener('hashchange', resetForm);
    };
  });

  // производим регистрацию
  function handleRegister({ name, email, password }) {
    return auth
      .register(name, email, password)
      .then((res) => {
        console.log(res);
        if (!res || res.statusCode === 400) {
          console.log('Что-то пошло не так');
        } else {
          setLoggedIn(true);
          history.push('/signin');
          return res;
        }
      })
      .catch((err) => {
        handleError(err);
      });
  }

  // производим вход
  function handleLogin({ email, password }) {
    return auth
      .login(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          console.log('Что-то пошло не так');
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        handleError(err);
      });
  }

  // проверка токена
  const handleTokenCheck = React.useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkToken(token)

        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
            history.push('/movies');
          }
        })
        .catch((err) => console.log(err));
    } else {
      setLoggedIn(false);
      localStorage.removeItem('jwt');
      history.push('/sign-in');
    }
  }, [history]);

  React.useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  // выход из аккаунта
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.clear('filtered');
    setSavedMovies([]);
    setSavedMoviesFiltered([]);
    history.push('/');
  }

  // редактируем профиль
  function handleUpdateUser(e) {
    e.preventDefault();
    if (isValid === true) {
      api
        .editUserInfo(values.name, values.email)
        .then((res) => {
          if (!res.message) {
            setValues({ name: res.name, email: res.email });
          } else {
            handleError(res.message);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  const handleError = (message) => {
    setErrorMessage(true);
    setServerError(message);
  };

  // работа строки поиска
  async function handleSearchForm(e) {
    e.preventDefault();
    if (isValid === true) {
      const filteredMovies = filterMovies(allBeatMovies, shortMovieToggle, values.search.toLowerCase());
      filteredMovies.forEach((item) => (item.isLiked = savedMovies.some((i) => i.movieId === item.id)));
      setBeatMoviesFiltered(filteredMovies);
      localStorage.setItem('filtered', JSON.stringify(filteredMovies));
    } else {
      setErrors({ search: 'Нужно ввести ключевое слово' });
    }
  }

  // поиск по сохраненным фильмам
  async function handleSavedSearch(e) {
    e.preventDefault();
    if (isValid === true) {
      const filteredMovies = filterMovies(savedMovies, shortMovieToggleSaved, values.search.toLowerCase());
      console.log(`filtered movies ${JSON.stringify(filteredMovies)}`);
      setSavedMoviesFiltered(filteredMovies);
    } else {
      setErrors({ search: 'Нужно ввести ключевое слово' });
    }
  }

  // перключаемся на короткометражки в общей вкладке
  function handleSwitchShortMovies() {
    setShortMovieToggle(!shortMovieToggle);
  }

  // перключаемся на короткометражки в saved movies
  function handleSavedSwitchShortMovies() {
    setShortMovieToggleSaved(!shortMovieToggleSaved);
  }

  // фильтрация фильмов
  function filterMovies(arrayMovies, shortMoviesToggle, serchWord) {
    return arrayMovies.filter((movie) => {
      const nameEN = movie.nameEN?.toLowerCase();
      const nameRU = movie.nameRU?.toLowerCase();
      const containName = serchWord
        ? (nameEN && nameEN !== null && nameEN.includes(serchWord)) ||
          (nameRU && nameRU !== null && nameRU.includes(serchWord))
        : true;
      const isShortMovie = shortMoviesToggle ? movie.duration <= 40 : true;
      return containName && isShortMovie;
    });
  }

  // добавляем или удаляем фильм
  async function handleSaveMovie(movie) {
    try {
      const savedMovie = savedMovies.find((i) => i.movieId === movie.id);
      if (savedMovie) {
        await api.deleteMovie(savedMovie._id);
        setSavedMovies(savedMovies.filter((item) => item._id !== savedMovie._id));
        setSavedMoviesFiltered(savedMoviesFiltered.filter((item) => item._id !== savedMovie._id));
        const filteredMovies = beatMoviesFiltered.map((item) => {
          if (item.id === savedMovie.movieId) {
            item.isLiked = false;
          }
          return item;
        });
        setBeatMoviesFiltered(filteredMovies);
      } else {
        const newItem = await api.createMovies({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: movie.image.url ? `${MOVIE_IMG_URL}${movie.image.url}` : '',
          trailer: movie.trailerLink,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          thumbnail: movie.image.formats.thumbnail.url ? `${MOVIE_IMG_URL}${movie.image.formats.thumbnail.url}` : '',
          movieId: movie.id,
        });
        setSavedMovies(savedMovies.concat([newItem]));
        setSavedMoviesFiltered(savedMoviesFiltered.concat([newItem]));
        setBeatMoviesFiltered(
          beatMoviesFiltered.map((item) => {
            if (item.id === movie.id) {
              item.isLiked = true;
            }
            return item;
          })
        );
      }
      localStorage.setItem('filtered', JSON.stringify(beatMoviesFiltered));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteMovie(movie) {
    try {
      await api.deleteMovie(movie._id);
      setSavedMovies(savedMovies.filter((item) => item._id !== movie._id));
      setSavedMoviesFiltered(savedMoviesFiltered.filter((item) => item._id !== movie._id));
      setBeatMoviesFiltered(
        beatMoviesFiltered.map((item) => {
          if (item.id === movie.movieId) {
            item.isLiked = false;
          }
          return item;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  // отрисовываем карточки с фильмами
  function defineListMoviesLength() {
    const screenWith = window.screen.availWidth;
    if (screenWith >= 1280) {
      setMoviesLength(4);
      setListLength(12);
    } else if (screenWith >= 768 && screenWith <= 1279) {
      setMoviesLength(2);
      setListLength(8);
    } else if (screenWith <= 320 && screenWith <= 767) {
      setMoviesLength(2);
      setListLength(5);
    }
  }

  // работа кнопки "Ещё"
  function addMoreMovies() {
    setListLength(listLength + moviesLength);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isLoading ? (
          <Preloader />
        ) : (
          <Switch>
            <Route exact path="/">
              <Main loggedIn={loggedIn} />
            </Route>

            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              isLoading={isLoading}
              handleSearchForm={handleSearchForm}
              handleSaveMovie={handleSaveMovie}
              movies={beatMoviesFiltered}
              isValid={isValid}
              checked={shortMovieToggle}
              handleChange={handleChange}
              addMoreMovies={addMoreMovies}
              listLength={listLength}
              defineListMoviesLength={defineListMoviesLength}
              handleSwitchShortMovies={handleSwitchShortMovies}
              errors={errors}
              serverError={serverError}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              isLoading={isLoading}
              handleChange={handleChange}
              savedMovies={savedMoviesFiltered}
              checked={shortMovieToggleSaved}
              handleDeleteMovie={handleDeleteMovie}
              listLength={listLength}
              defineListMoviesLength={defineListMoviesLength}
              handleSavedSwitchShortMovies={handleSavedSwitchShortMovies}
              handleSavedSearch={handleSavedSearch}
              errors={errors}
              serverError={serverError}
              isValid={isValid}
            />

            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              handleChange={handleChange}
              onSignOut={handleSignOut}
              onUpdateUser={handleUpdateUser}
              errors={errors}
              isValid={isValid}
              serverError={serverError}
            />

            <Route path="/signin">
              <Login
                onLogin={handleLogin}
                tokenCheck={handleTokenCheck}
                isValid={isValid}
                loggedIn={loggedIn}
                errors={errors}
                errorMessage={errorMessage}
                serverError={serverError}
              />
            </Route>

            <Route path="/signup">
              <Register
                onRegister={handleRegister}
                handleChange={handleChange}
                isValid={isValid}
                loggedIn={loggedIn}
                errors={errors}
                errorMessage={errorMessage}
                serverError={serverError}
              />
            </Route>

            <Route>{loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}</Route>

            <Route exact path="/404">
              <ErrorNotFound />
            </Route>

            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
