import './MoviesCard.css';
import React from 'react';
import poster from '../../images/poster.svg';


function MoviesCard() {

    const [isMarked, setIsMarked] = React.useState(true);

    function handleClick() {
        setIsMarked(!isMarked);
      }

    return(
<section className="movie">
        <div className="movie__nowrap">
            <h3 className="movie__name">В погоне за Бенкси</h3>
            <p className="movie__length">27 минут</p>
        </div>
        <img className="movie__poster" src={poster} alt="Постер" />
    <button className="button"  type="button" onClick={handleClick}>
        {isMarked ? 
        <p className="button__text">Сохранить</p>
    : <p className="button__text">&#10003;</p>
    }
    </button>
</section>
    )
}

export default MoviesCard;