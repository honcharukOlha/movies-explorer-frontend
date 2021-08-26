import './Navigation.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg';

function Navigation({ isOpen, onClose }) {
  return (
    <section className="header">
      <NavLink to="/">
        <img src={logo} className="header__logo" alt="Логотип сайта" />
      </NavLink>
      <div className={`${isOpen ? 'header__popup header__popup_opened' : 'header__popup'}`}>
        <button className="header__close-button" type="button" aria-label="close" onClick={onClose}></button>
        <nav className="header__menu">
          <div className="header__block header__block_navi">
            <NavLink to="/" className="header__text">
              Главная
            </NavLink>
            <NavLink to="/movies" className="header__text header__text_top" activeClassName="header__text_line">
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className="header__text header__text_top" activeClassName="header__text_line">
              Сохранённые фильмы
            </NavLink>
            <NavLink
              exact
              to="/profile"
              className="header__text header__text_popup"
              activeClassName="header__text_line"
            >
              <p>Аккаунт</p>
              <div className="header__link">
                <img className="header__link-image" src={profile} alt="Значок профиля" />
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default Navigation;
