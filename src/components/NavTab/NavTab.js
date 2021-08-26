import './NavTab.css';

function NavTab() {
  return (
    <ul className="navtab">
      <li className="navtab__item">
        <a href="#project" className="navtab__text">
          О проекте
        </a>
      </li>
      <li className="navtab__item">
        <a href="#techs" className="navtab__text">
          Технологии
        </a>
      </li>
      <li className="navtab__item">
        <a href="#aboutme" className="navtab__text">
          Студентка
        </a>
      </li>
    </ul>
  );
}

export default NavTab;
