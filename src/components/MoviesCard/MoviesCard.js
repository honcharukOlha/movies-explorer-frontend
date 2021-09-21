import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router';
const MOVIE_IMG_URL = 'https://api.nomoreparties.co';

function MoviesCard(props) {
  const location = useLocation();
  const { movie, handleSaveMovie, handleDeleteMovie, like } = props;

  const likeButtonClassName = `movie__button : ${like ? 'movie__button_active' : ''}`;
  const dislikeButtonClassName = `movie__button_disactive : ${!like ? 'movie__button' : ''}`;

  function handleSaveClick() {
    handleSaveMovie(movie);
  }

  function handleDeleteClick() {
    handleDeleteMovie(movie);
  }

  function durationMovie(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  if (location.pathname === '/movies') {
    return (
      <section className="movie">
        <div className="movie__block">
          <a className="movie__trailer" href={movie.trailerLink} rel="noreferrer" target="_blank">
            <img className="movie__poster" src={`${MOVIE_IMG_URL}${movie.image.url}`} alt={movie.nameRU} />
          </a>
          <div className="movie__nowrap">
            <h3 className="movie__name">{movie.nameRU}</h3>
            <button className={likeButtonClassName} type="button" onClick={handleSaveClick}></button>
          </div>
          <p className="movie__length">{durationMovie(movie.duration)}</p>
        </div>
      </section>
    );
  } else if (location.pathname === '/saved-movies') {
    return (
      <section className="movie">
        <div className="movie__block">
          <a className="movie__trailer" href={movie.trailer} rel="noreferrer" target="_blank">
            <img className="movie__poster" src={movie.image} alt={movie.nameRU} />
          </a>
          <div className="movie__nowrap">
            <h3 className="movie__name">{movie.nameRU}</h3>
            <button className={dislikeButtonClassName} type="button" onClick={handleDeleteClick}></button>
          </div>
          <p className="movie__length">{durationMovie(movie.duration)}</p>
        </div>
      </section>
    );
  }
}

export default MoviesCard;
