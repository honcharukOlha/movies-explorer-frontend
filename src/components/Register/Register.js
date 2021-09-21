import './Register.css';
import React from 'react';
import logo from '../../images/logo.svg';
import { NavLink, Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/useFormValidation';

function Register(props) {
  const { onRegister } = props;
  const { values, isValid, handleChange, resetForm, errors } = useFormWithValidation();

  const buttonClassName = `${isValid ? 'form__button' : 'form__button_disabled'}`;

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.name || !values.email || !values.password) {
      return;
    }
    onRegister(values);
  }

  return (
    <section className="register">
      <NavLink to="/" className="logo">
        <img src={logo} alt="Логотип сайта" />
      </NavLink>
      <h2 className="form__welcome">Добро пожаловать!</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <label className="form__label">Имя</label>
        <input
          className="form__input"
          id="name"
          name="name"
          type="text"
          placeholder="Имя"
          value={values.name || ''}
          minLength="2"
          maxLength="30"
          required
          onChange={handleChange}
        />
        <span id="register-name-error" className="form__error">
          {errors.name || ''}
        </span>
        <label className="form__label">E-mail</label>
        <input
          className="form__input"
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          value={values.email || ''}
          minLength="2"
          maxLength="30"
          required
          onChange={handleChange}
        />
        <span id="register-email-error" className="form__error">
          {errors.email || ''}
        </span>
        <label className="form__label">Пароль</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={values.password || ''}
          className="form__input"
          minLength="8"
          maxLength="30"
          required
          onChange={handleChange}
        />
        <span id="register-password-error" className="form__error">
          {errors.password}
        </span>
        <div className="form__button-container">
          <button type="submit" className={buttonClassName}>
            Зарегистрироваться
          </button>
        </div>
        <div className="form__links">
          <p>
            Уже зарегистрированы?
            <Link to="/signin" className="form__link">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Register;
