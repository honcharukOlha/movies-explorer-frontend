import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const {
    movies,
    loggedIn,
    savedMovies,
    defineListMoviesLength,
    listLength,
    handleDeleteMovie,
    checked,
    handleSavedSwitchShortMovies,
    isLoading,
    handleChange,
    errors,
    isValid,
    serverError,
    handleSavedSearch,
  } = props;

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        handleChange={handleChange}
        handleSearchForm={handleSavedSearch}
        checked={checked}
        errors={errors}
        isValid={isValid}
        listLength={listLength}
        defineListMoviesLength={defineListMoviesLength}
        handleSavedSwitchShortMovies={handleSavedSwitchShortMovies}
        serverError={serverError}
      />
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
        listLength={listLength}
        checked={checked}
        isLoading={isLoading}
        handleSwitchShortMovies={handleSavedSwitchShortMovies}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;
