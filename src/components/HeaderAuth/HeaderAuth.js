import './HeaderAuth.css';
import logo from '../../images/logo.svg';
import React from 'react';
import { NavLink } from 'react-router-dom';

function HeaderAuth() {
  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} className="header__logo" alt="Логотип сайта" />
      </NavLink>
      <nav className="header__block">
        <NavLink to="/signup" className="header__button" activeClassName="header__button_active">
          Регистрация
        </NavLink>
        <NavLink to="/signin" className="header__button" activeClassName="header__button_active">
          Войти
        </NavLink>
      </nav>
    </header>
  );
}

export default HeaderAuth;
