import './Login.css';
import React from 'react';
import logo from '../../images/logo.svg';
import { NavLink, Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/useFormValidation';

function Login(props) {
  const { onLogin } = props;
  const { values, isValid, handleChange, resetForm, errors } = useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);
  }

  const buttonClassName = `${isValid ? 'form__button' : 'form__button_disabled'}`;

  return (
    <section className="login">
      <NavLink to="/" className="logo">
        <img src={logo} alt="Логотип сайта" />
      </NavLink>
      <h2 className="form__welcome">Рады видеть!</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <label className="form__label">E-mail</label>
        <input
          required
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          className="form__input"
          value={values.email || ''}
          onChange={handleChange}
        />
        <span id="login-email-error" className="form__error">
          {errors.email}
        </span>
        <label className="form__label">Пароль</label>
        <input
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="8"
          className="form__input"
          value={values.password || ''}
          onChange={handleChange}
        />
        <span id="login-password-error" className="form__error">
          {errors.password}
        </span>
        <div className="form__button-container">
          <button type="submit" className={buttonClassName}>
            Войти
          </button>
        </div>
        <div className="form__links">
          <p>
            Еще не зарегистрированы?
            <Link to="/signup" className="form__link">
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Login;
