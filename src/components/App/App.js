import './App.css';
import React from 'react';
import {  Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import * as auth from '../../utils/auth';
import api from '../../utils/mainApi';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [userData, setUserData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  // Получаем информацию пользователя
  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
        Promise.all([api.getUserInfo(), api.getMovies()])
            .then(([user, movies]) => {
                setCurrentUser(user);
                setMovies(movies);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}, [loggedIn]);

  function handleRegister({ name, email, password }) {
    return auth
      .register(name, email, password)
      .then((res) => {
        console.log(res);
        if (!res || res.statusCode === 400) {
          console.log("Что-то пошло не так");
        } else {
          handleLogin({ email, password });
          history.push("/movies");
          return res;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin({ email, password }) {
    return auth
      .login(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          console.log("Что-то пошло не так");
        }
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const tokenCheck = React.useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserData(true);
      return;
    }
    api
      .getUserInfo(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserData(true);
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/signin");
      })
      .finally(() => {
        setUserData(true);
      });
  }, [history]);

  React.useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

   // Выход из аккаунта
   //function handleSignOut() {
    //localStorage.removeItem('token');
    //setCurrentUser({ isLoggedIn: false });
   // history.push('/movies');
//}

  return(
    <div className="root">
      <div className="page">

      <Switch>

        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/movies">
          <Movies />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path='/signin'>
          <Login onLogin={handleLogin} tokenCheck={tokenCheck} loggedIn={loggedIn} />
        </Route>

        <Route path='/signup'>
          <Register onRegister={handleRegister} loggedIn={loggedIn} />
        </Route>

      </Switch>

    </div>
  </div>
  );
}

export default App;
