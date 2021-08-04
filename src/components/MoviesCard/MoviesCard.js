import './MoviesCard.css';
import React from 'react';
import poster from '../../images/poster.svg';
import SavedButton from '../SavedButton/SavedButton';
import DeleteButton from '../DeleteButton/DeleteButton';


function MoviesCard() {
    return(
<section className="movie">
        <div className="movie__nowrap">
            <h3 className="movie__name">В погоне за Бенкси</h3>
            <p className="movie__length">27 минут</p>
        </div>
        <img className="movie__poster" src={poster} alt="Постер" />
        <SavedButton />
</section>
    )
}

export default MoviesCard;