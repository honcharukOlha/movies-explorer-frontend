import './SavedMovies.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function SavedMovies() {
    return (
        <section className="movies">
            <div className="movies__list">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </div>
            <div className="movies__more">Ещё</div>
        </section>
    )
}

export default SavedMovies;