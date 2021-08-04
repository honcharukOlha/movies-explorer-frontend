import './SavedMovies.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import DeleteButton from '../DeleteButton/DeleteButton';
import poster from '../../images/poster.svg';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

function SavedMovies() {
    return (
        <section className="movies">
            <Navigation />
            <SearchForm />
            <div className="movies__list">
            <div className="movie">
        <div className="movie__nowrap">
            <h3 className="movie__name">В погоне за Бенкси</h3>
            <p className="movie__length">27 минут</p>
        </div>
        <img className="movie__poster" src={poster} alt="Постер" />
            <DeleteButton />
        </div>
        <div className="movie">
        <div className="movie__nowrap">
            <h3 className="movie__name">В погоне за Бенкси</h3>
            <p className="movie__length">27 минут</p>
        </div>
        <img className="movie__poster" src={poster} alt="Постер" />
            <DeleteButton />
        </div>
        <div className="movie">
        <div className="movie__nowrap">
            <h3 className="movie__name">В погоне за Бенкси</h3>
            <p className="movie__length">27 минут</p>
        </div>
        <img className="movie__poster" src={poster} alt="Постер" />
            <DeleteButton />
        </div>
        </div>
        <div className="movies__more">Ещё</div>
        <Footer />
        </section>
    )
}

export default SavedMovies;