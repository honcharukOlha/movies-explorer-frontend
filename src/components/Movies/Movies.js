import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Navigation from '../Navigation/Navigation';

function Movies() {
    return (
      <section>
        <Navigation />
        <SearchForm />
        <MoviesCardList />
      </section>
    );
  }
  
  export default Movies;