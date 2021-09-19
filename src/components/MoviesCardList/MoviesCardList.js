import './MoviesCardList.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const { data, addMoreMovies, isLoading, handleSaveMovie, savedMovies, handleDeleteMovie, listLength } = props;
  const location = useLocation();
  const moviesListLength = location.pathname === '/movies' ? data.length : savedMovies.length;

  const nothingFindedClassName = `movies__message ${moviesListLength === 0 ? 'movies__message_active' : ''}`;
  const isAddMoreButtonVisible = moviesListLength > listLength;
  const addMoreButtonClassName = `movies__more ${isAddMoreButtonVisible ? '' : 'movies__more_disable'}`;

  const handleClick = () => {
    addMoreMovies();
  };

  if (isLoading) {
    return <Preloader isLoading={isLoading} />;
  }

  if (location.pathname === '/movies') {
    return (
      <>
        <section className="movies">
          <div className="movies__list">
            {data
              .map((movie) => (
                <MoviesCard key={movie.id} movie={movie} like={movie.isLiked} handleSaveMovie={handleSaveMovie} />
              ))
              .slice(0, listLength)}
          </div>
          <p className={nothingFindedClassName}>Ничего не найдено</p>
        </section>
        <div className={addMoreButtonClassName} onClick={handleClick}>
          <button type="button" className="movies__more-button">
            Ещё
          </button>
        </div>
      </>
    );
  } else if (location.pathname === '/saved-movies') {
    return (
      <>
        <section className="movies">
          <div className="movies__list">
            {savedMovies.map((movie) => (
              <MoviesCard key={movie._id} movie={movie} handleDeleteMovie={handleDeleteMovie} />
            ))}
          </div>
          <p className={nothingFindedClassName}>Ничего не найдено</p>
        </section>
      </>
    );
  }
}

export default MoviesCardList;
