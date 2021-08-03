import './Login.css';
import logo from '../../images/logo.svg';
import { NavLink, Link } from 'react-router-dom';

function Login() {
    return (
        <section className="login">
            <NavLink to="/" className="logo">
                <img src={logo} alt="Логотип сайта"/>
            </NavLink>
            <form className="form" noValidate>
            <h2 className="form__welcome">Рады видеть!</h2>
            <label className="form__label">E-mail</label>
            <input
                    required
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="form__input"
                    errorText="Что-то пошло не так..."
                    />
            <label className="form__label">Пароль</label>
            <input
                    required
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    className="form__input"
                    errorText="Что-то пошло не так..."
                    />
                <div className="form__button-container">
                    <button
                        type="submit"
                        className="form__button"
                    >
                        Войти
                    </button>
                </div>
            <div className="form__links">
                <p>Еще не зарегистрированы?
                    <Link to="/signup" className="form__link">
                        Регистрация
                    </Link>
                </p>
            </div>
            </form>
        </section>
    )
}

export default Login;