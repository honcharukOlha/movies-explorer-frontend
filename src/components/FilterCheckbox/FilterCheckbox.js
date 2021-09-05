import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
     
    <div className="checkbox">  
      <input className="checkbox__input" type="checkbox" value="None"name="checkbox" />
      <label className="checkbox__label" for="filter"></label>
    </div>
    
  );
}

export default FilterCheckbox;