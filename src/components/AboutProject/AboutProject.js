import './AboutProject.css';

function AboutProject() {
  return (
    <section className="project" id="project">
      <h2 className="project__title">О проекте</h2>
      <ul className="project__list">
        <li className="project__list-item">
          <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className="project__list-item">
          <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="progress">
        <p className="progress__weeks">1 неделя</p>
        <p className="progress__weeks">4 недели</p>
        <p className="progress__name">Back-end</p>
        <p className="progress__name">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
