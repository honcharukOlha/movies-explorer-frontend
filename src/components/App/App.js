import './App.css';
import React from 'react';
import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import * as auth from '../../utils/auth';
import api from '../../utils/mainApi';
import moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useFormWithValidation } from '../../utils/useFormValidation';
const MOVIE_IMG_URL = 'https://api.nomoreparties.co';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const location = useLocation();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [beatMoviesFiltered, setBeatMoviesFiltered] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesFiltered, setSavedMoviesFiltered] = React.useState([]);
  const [shortMovieToggle, setShortMovieToggle] = React.useState(false);
  const [shortMovieToggleSaved, setShortMovieToggleSaved] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [serverError, setServerError] = React.useState('');
  const [moviesColumnsCount, setMoviesColumnsCount] = React.useState(0);
  const [initialMoviesListLength, setInitialMoviesListLength] = React.useState(0);
  const [moviesListLength, setMoviesListLength] = React.useState(0);
  const { isValid, values, errors, setErrors, setValues, handleChange, resetForm } = useFormWithValidation();
  const [allBeatMovies, setAllBeatMovies] = React.useState([]);
  const [lastSearchedBeatMovies, setLastSearchedBeatMovies] = React.useState([]);
  const [lastSearchedSavedMovies, setLastSearchedSavedMovies] = React.useState([]);

  // инициализация
  React.useEffect(async () => {
    if (!loggedIn) return;
    setBeatMoviesFiltered(JSON.parse(localStorage.getItem('filtered')) ?? []);
    try {
      setIsLoading(true);
      const cachedBeatMovies = JSON.parse(localStorage.getItem('filtered')) ?? [];
      const allSavedMovies = await api.getMovies();
      cachedBeatMovies.forEach((item) => (item.isLiked = allSavedMovies.some((i) => i.movieId === item.id)));
      setLastSearchedBeatMovies(cachedBeatMovies);
      setBeatMoviesFiltered(cachedBeatMovies);
      setSavedMovies(allSavedMovies);
      setLastSearchedSavedMovies(allSavedMovies);
      setSavedMoviesFiltered(allSavedMovies);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loggedIn]);

  // слушатель изменения размеров окна
  React.useEffect(() => {
    window.addEventListener('resize', defineListMoviesLength);
    window.addEventListener('hashchange', resetForm);
    return () => {
      window.removeEventListener('resize', defineListMoviesLength);
      window.removeEventListener('hashchange', resetForm);
    };
  });

  // начальная настройка параметров окна
  React.useEffect(() => {
    defineListMoviesLength();
  }, []);

  // производим регистрацию
  function handleRegister({ name, email, password }) {
    return auth
      .register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          console.log('Что-то пошло не так');
        } else {
          handleLogin({ email, password });
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
            history.push(location);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setLoggedIn(false);
      localStorage.removeItem('token');
      history.push('/signin');
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
      let moviesArray = allBeatMovies;
      if (allBeatMovies.length === 0) {
        moviesArray = await loadBeatMovies();
      }
      setShortMovieToggle(false);
      const filteredMovies = filterMovies(moviesArray, null, values?.search?.toLowerCase());
      filteredMovies.forEach((item) => (item.isLiked = savedMovies.some((i) => i.movieId === item.id)));
      // откатываем пагинацию
      setMoviesListLength(initialMoviesListLength);
      setBeatMoviesFiltered(filteredMovies);
      setLastSearchedBeatMovies(filteredMovies);
      localStorage.setItem('filtered', JSON.stringify(filteredMovies));
    } else {
      setErrors({ search: 'Нужно ввести ключевое слово' });
    }
  }

  async function loadBeatMovies() {
    try {
      setIsLoading(true);
      const result = await moviesApi.getMovies();
      setAllBeatMovies(result);
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // поиск по сохраненным фильмам
  function handleSavedSearch(e) {
    e.preventDefault();
    if (isValid === true) {
      setShortMovieToggleSaved(false);
      const filteredMovies = filterMovies(savedMovies, null, values?.search?.toLowerCase());
      setSavedMoviesFiltered(filteredMovies);
      setLastSearchedSavedMovies(filteredMovies);
    } else {
      setErrors({ search: 'Нужно ввести ключевое слово' });
    }
  }

  // перключаемся на короткометражки в общей вкладке
  async function handleSwitchShortMovies() {
    const newToggleValue = !shortMovieToggle;
    setShortMovieToggle(newToggleValue);
    const filteredMovies = filterMovies(lastSearchedBeatMovies, newToggleValue, null);
    setBeatMoviesFiltered(filteredMovies);
  }

  // перключаемся на короткометражки в saved movies
  function handleSavedSwitchShortMovies() {
    const newToggleValue = !shortMovieToggleSaved;
    setShortMovieToggleSaved(newToggleValue);
    const filteredMovies = filterMovies(lastSearchedSavedMovies, newToggleValue, null);
    setSavedMoviesFiltered(filteredMovies);
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
        const savedMoviesPredicate = (item) => item._id !== savedMovie._id;
        const beatMoviesMapper = (item) => {
          if (item.id === savedMovie.movieId) {
            item.isLiked = false;
          }
          return item;
        };
        setSavedMovies(savedMovies.filter(savedMoviesPredicate));
        setSavedMoviesFiltered(savedMoviesFiltered.filter(savedMoviesPredicate));
        setLastSearchedSavedMovies(lastSearchedSavedMovies.filter(savedMoviesPredicate));
        const filteredMovies = beatMoviesFiltered.map(beatMoviesMapper);
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
        const beatMoviesMapper = (item) => {
          if (item.id === movie.id) {
            item.isLiked = true;
          }
          return item;
        };
        setSavedMovies(savedMovies.concat([newItem]));
        setSavedMoviesFiltered(savedMoviesFiltered.concat([newItem]));
        setLastSearchedBeatMovies(lastSearchedBeatMovies.map(beatMoviesMapper));
        setBeatMoviesFiltered(beatMoviesFiltered.map(beatMoviesMapper));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteMovie(movie) {
    try {
      await api.deleteMovie(movie._id);
      const savedMoviesPredicate = (item) => item._id !== movie._id;
      setSavedMovies(savedMovies.filter(savedMoviesPredicate));
      setSavedMoviesFiltered(savedMoviesFiltered.filter(savedMoviesPredicate));
      setLastSearchedSavedMovies(lastSearchedSavedMovies.filter(savedMoviesPredicate));
      const beatMoviesMapper = (item) => {
        if (item.id === movie.movieId) {
          item.isLiked = false;
        }
        return item;
      };
      setBeatMoviesFiltered(beatMoviesFiltered.map(beatMoviesMapper));
      setLastSearchedBeatMovies(lastSearchedBeatMovies.map(beatMoviesMapper));
    } catch (error) {
      console.log(error);
    }
  }

  // отрисовываем карточки с фильмами
  function defineListMoviesLength() {
    const screenWith = window.innerWidth;
    let columnsCount = 0;
    let initialItemsCount = 0;
    if (screenWith >= 1280) {
      columnsCount = 4;
      initialItemsCount = 12;
    } else if (screenWith >= 480 && screenWith <= 1279) {
      columnsCount = 2;
      initialItemsCount = 8;
    } else if (screenWith >= 320 && screenWith <= 479) {
      columnsCount = 1;
      initialItemsCount = 5;
    }
    setMoviesColumnsCount(columnsCount);
    setInitialMoviesListLength(initialItemsCount);
    // если еще не была задана длинна списка - простовляем ее равной начальной длинее (до нажатия кнопки еще)
    if (moviesListLength === 0) {
      setMoviesListLength(initialItemsCount);
    }
  }

  // работа кнопки "Ещё"
  function addMoreMovies() {
    let listIncrement = moviesColumnsCount;
    if (moviesColumnsCount === 1) {
      listIncrement = 2;
    }
    setMoviesListLength(moviesListLength + listIncrement);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
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
            listLength={moviesListLength}
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
            listLength={moviesListLength}
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
            values={values}
            resetForm={resetForm}
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
          <Route exact path="/">
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
          </Route>

          <Route>
            <ErrorNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
