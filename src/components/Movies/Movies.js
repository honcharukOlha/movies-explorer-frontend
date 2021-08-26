import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies(props) {
  const {
    loggedIn,
    isLoading,
    handleSearchForm,
    movies,
    handleSaveMovie,
    savedMovies,
    addMoreMovies,
    defineListMoviesLength,
    listLength,
    handleSwitchShortMovies,
    setErrorMessage,
    handleChange,
    checked,
    isValid,
    errors,
  } = props;

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        handleChange={handleChange}
        handleSearchForm={handleSearchForm}
        listLength={listLength}
        defineListMoviesLength={defineListMoviesLength}
        handleSwitchShortMovies={handleSwitchShortMovies}
        checked={checked}
        setErrorMessage={setErrorMessage}
        isValid={isValid}
        errors={errors}
      />
      <MoviesCardList
        data={movies}
        listLength={listLength}
        handleSaveMovie={handleSaveMovie}
        savedMovies={savedMovies}
        handleSwitchShortMovies={handleSwitchShortMovies}
        checked={checked}
        isLoading={isLoading}
        addMoreMovies={addMoreMovies}
      />
      <Footer />
    </section>
  );
}

export default Movies;
