import './Navigation.css';
import React from 'react';
import icon from '../../images/icon-profile.svg';
import { NavLink, Link } from "react-router-dom";


function Navigation() {

    return (
        <section className="navigation">
            <div className="navigation__popup navigation__popup_opened">
                <button className="navigation__close-button navigation__popup"  type="button" aria-label="close" ></button>
                <nav className="navigation__menu">
                    <div className="navigation__block">
                        <NavLink to="/" className="navigation__text navigation__text_main" activeClassName="navigation__text_active">Главная</NavLink>
                        <NavLink to="/movies" className="navigation__text" activeClassName="navigation__text_active">Фильмы</NavLink>
                        <NavLink to="/saved-movies" className="navigation__text" activeClassName="navigation__text_active">Сохранённые фильмы</NavLink>
                    </div>
                    <NavLink exact path="/profile" className="navigation__profile">
                        <p className="navigation__text navigation__text_profile">Аккаунт</p>
                        <Link
                            to="/profile"
                            className="navigation__link"
                            src={icon} 
                        />
                    </NavLink>
                </nav>
            </div>
        </section>
    )
}

export default Navigation;