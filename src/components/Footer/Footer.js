import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__item">
            <a href="https://praktikum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a href="https://github.com/honcharukOlha" className="footer__link" target="_blank" rel="noreferrer">
              Github
            </a>
          </li>
          <li className="footer__item">
            <a href="https://facebook.com" className="footer__link" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
