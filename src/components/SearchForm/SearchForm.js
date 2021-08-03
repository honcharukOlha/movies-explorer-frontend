import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
      <section className="search">
          <form className="search__form">
            <input className="search__input" placeholder="Фильм"/>
            <button className="search__button">Найти</button>
          </form>
          <div className="search__filter">
            <FilterCheckbox/>
            <p className="search__text">Короткометражки</p>
          </div>
      </section>
    );
  }
  
  export default SearchForm;