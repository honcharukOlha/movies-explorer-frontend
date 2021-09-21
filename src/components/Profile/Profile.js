import './Profile.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const { onSignOut, onUpdateUser, loggedIn, errors, values, isValid, handleChange, resetForm } = props;
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className="profile">
      <Header loggedIn={loggedIn} />
      <div className="profile__block">
        <h2 className="profile__welcome">Привет,{currentUser.name}!</h2>
        <form className="profile__form" noValidate onSubmit={onUpdateUser}>
          <div className="profile__nowrap">
            <label className="profile__label">Имя</label>
            <input
              className=" profile__label profile__input"
              id="name"
              name="name"
              type="text"
              value={values.name || ''}
              placeholder={currentUser.name || ''}
              minLength="2"
              maxLength="30"
              required
              onChange={handleChange}
            />
            <span id="profile-name-error" className="form__error">
              {errors.name}
            </span>
          </div>
          <div className="profile__nowrap">
            <label className="profile__label">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              className="profile__label profile__input"
              placeholder={currentUser.email || ''}
              value={values.email || ''}
              required
              onChange={handleChange}
            />
            <span id="register-email-error" className="form__error">
              {errors.email || ''}
            </span>
          </div>
          <button className="profile__button">{isValid ? 'Сохранить' : 'Редактировать'}</button>
        </form>
        <div className="profile__links">
          <p>
            <Link to="/" className="profile__link" onClick={onSignOut}>
              Выйти из аккаунта
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Profile;
