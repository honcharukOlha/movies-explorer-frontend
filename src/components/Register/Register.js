import './Register.css';
import logo from '../../images/logo.svg';
import { NavLink, Link } from 'react-router-dom';

function Register() {
    return (
      <section className="register">
        <NavLink to="/" className="logo">
            <img src={logo} alt="Логотип сайта"/>
        </NavLink>
        <h2 className="register__welcome">Добро пожаловать!</h2>
        <form className="form">
          <label className="form__label">Имя</label>
          <input className="form__input" 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Имя" 
            errorText="Что-то пошло не так..."
            minLength="2" 
            maxLength="30" 
            required
          />
          <label className="form__label">E-mail</label>
          <input
            className="form__input"
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            errorText="Что-то пошло не так..."
            minLength="2"
            maxLength="30"
            required
            />
           <label className="form__label">Пароль</label>
           <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            className="form__input"
            errorText="Что-то пошло не так..."
            minLength="8"
            maxLength="30"
            required
           />
           <div className="form__button-container">
                <button
                    type="submit"
                    className="form__button"
                >
                Зарегистрироваться
                </button>
            </div>
            <div className="form__links">
                <p>Уже зарегистрированы?
                    <Link to="/signin" className="form__link">
                       Войти
                    </Link>
                </p>
            </div>
        </form>
      </section>
    )
}

export default Register;