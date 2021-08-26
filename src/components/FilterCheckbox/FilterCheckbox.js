import './FilterCheckbox.css';
import { useLocation } from 'react-router';

function FilterCheckbox({ checked, handleSwitchShortMovies, handleSavedSwitchShortMovies }) {
  const location = useLocation();
  const handleClick = () => {
    handleSwitchShortMovies();
  };

  const handleSaveDurationClick = () => {
    handleSavedSwitchShortMovies();
  };

  if (location.pathname === '/movies') {
    return (
      <div className="checkbox" checked={checked}>
        <label className="checkbox__label">
          <input onClick={handleClick} className="checkbox__input" type="checkbox" value="None" name="checkbox" />
          <span className="checkbox__slider checkbox__circle" />
        </label>
      </div>
    );
  } else if (location.pathname === '/saved-movies') {
    return (
      <div className="checkbox" checked={checked}>
        <label className="checkbox__label">
          <input
            onClick={handleSaveDurationClick}
            className="checkbox__input"
            type="checkbox"
            value="None"
            name="checkbox"
          />
          <span className="checkbox__slider checkbox__circle" />
        </label>
      </div>
    );
  }
}

export default FilterCheckbox;
