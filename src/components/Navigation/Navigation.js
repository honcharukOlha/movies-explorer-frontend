import './Navigation.css';
import React from 'react';
import { NavLink, Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg';



function Navigation() {

    return (
        <section className="header">
            <NavLink to="/">
            <img src={logo} className="header__logo" alt="Логотип сайта"/> 
        </NavLink>
            <div className="header__popup header__popup_opened">
                <button className="header__close-button header__popup"  type="button" aria-label="close" ></button>
                <nav className="header__menu">
                    <div className="header__block header__block_navi">
                        <NavLink to="/" className="header__text header__text_main" activeClassName="navigation__text_active">Главная</NavLink>
                        <NavLink to="/movies" className="header__text header__text_top header__text_line" activeClassName="navigation__text_active">Фильмы</NavLink>
                        <NavLink to="/saved-movies" className="header__text header__text_top" activeClassName="header__text_active">Сохранённые фильмы</NavLink>
                        <NavLink exact to="/profile" className="header__text">
                            <p>Аккаунт</p>
                         <div className="header__link">
                            <img className="header__link-image" src={profile} alt="Значок профиля"/>
                        </div>
                    </NavLink>
                    </div>
                </nav>
            </div>
        </section>
    )
}

export default Navigation;