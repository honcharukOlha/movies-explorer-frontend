import './Profile.css';
import {  Link } from 'react-router-dom';

function Login() {
    return (
        <section className="profile">
            <h2 className="profile__welcome">Привет, Ольга!</h2>
            <form className="profile__form" noValidate>
                <div className="profile__nowrap">
                    <label className="profile__label">Имя</label>
                    <input 
                        className=" profile__label profile__input" 
                        id="name" 
                        name="name" 
                        type="text"
                        placeholder="Имя"    
                        minLength="2" 
                        maxLength="30" 
                        errorText="Что-то пошло не так..."
                        required
                    />
                </div>
                <div className="profile__nowrap">
                    <label className="profile__label">E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="profile__label profile__input"
                        placeholder="E-mail" 
                        errorText="Что-то пошло не так..."
                        required
                    />
                </div>
            </form>
            <div className="profile__button-container">
                <button
                    type="submit"
                    className="profile__button"
                >
                    Редактировать
                </button>
            </div>
            <div className="profile__links">
                <p>
                    <Link to="/movies" className="profile__link">
                    Выйти из аккаунта
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default Login;