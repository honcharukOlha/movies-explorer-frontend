import './MoviesCardList.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const { data, addMoreMovies, isLoading, listLength, handleSaveMovie, savedMovies, handleDeleteMovie } = props;
  const location = useLocation();

  const buttonClassName = `movies__message ${listLength === 0 ? 'movies__message_active' : ''}`;

  const handleClick = () => {
    addMoreMovies();
  };

  if (location.pathname === '/movies') {
    return (
      <>
        <section className="movies">
          <Preloader isLoading={isLoading} />
          <div className="movies__list">
            {data
              .map((movie) => (
                <MoviesCard key={movie.id} movie={movie} like={movie.isLiked} handleSaveMovie={handleSaveMovie} />
              ))
              .slice(0, listLength)}
            <p className={buttonClassName}>Ничего не найдено</p>
          </div>
        </section>
        <div className="movies__more" onClick={handleClick}>
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
          <Preloader isLoading={isLoading} />
          <div className="movies__list">
            {savedMovies
              .map((movie) => <MoviesCard key={movie._id} movie={movie} handleDeleteMovie={handleDeleteMovie} />)
              .slice(0, listLength)}
            <p className={buttonClassName}>Ничего не найдено</p>
          </div>
        </section>
      </>
    );
  }
}

export default MoviesCardList;
