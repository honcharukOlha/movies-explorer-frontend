import './SearchForm.css';
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
function SearchForm(props) {
  const { handleSearchForm, handleSwitchShortMovies, handleSavedSwitchShortMovies, checked, handleChange, errors } =
    props;

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSearchForm} noValidate>
        <div className="search__wrap">
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            name="search"
            onChange={handleChange}
            required
          />
          <button className="search__button">Найти</button>
        </div>
        <span id="search-name-error" className="form__error form__error_search">
          {errors.search || ''}
        </span>
      </form>
      <div className="search__filter">
        <FilterCheckbox
          handleSwitchShortMovies={handleSwitchShortMovies}
          handleSavedSwitchShortMovies={handleSavedSwitchShortMovies}
          checked={checked}
        />
        <p className="search__text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
