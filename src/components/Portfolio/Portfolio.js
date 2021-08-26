import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <a
            href="https://github.com/honcharukOlha/how-to-learn"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <p className="portfolio__transition">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://honcharukolha.github.io/russian-travel/"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <p className="portfolio__transition">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/yandex-praktikum/react-mesto-auth"
            className="portfolio__link portfolio__link_border-none"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <p className="portfolio__transition">&#8599;</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
