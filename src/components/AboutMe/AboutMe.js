import './AboutMe.css';

function AboutMe() {
    return (
        <section className="aboutme">
             <h2 className="aboutme__title">Студентка</h2>
             <div className="aboutme__block">
             <div className="aboutme__info">
                <h3 className="aboutme__name">Ольга</h3>
                <p className="aboutme__job">Фронтенд-разработчик, 28 лет</p>
                <p className="aboutme__for-me">Я родилась в Туркменистане. Там прошло мое детство и об этой стране у меня остались наилучшие воспоминания. Сейчас я проживаю в России с мужем и дочерью. В декретном отпуске я решила заняться саморазвитием и выбрала для этой цели курс Веб-разработки от Яндекс.Практикума. Процесс меня очень увлек и я планирую продолжать развиваться в программировании и начать свой карьерный путь в данной отрасли. Увлекаюсь бисероплетением, люблю много и вкусно готовить, собирать большую компанию друзей, обожаю романы Терри Пратчетта.</p>
                <ul className="aboutme__links">
                 <li className="aboutme__item">
                     <a className="aboutme__link" href="https://facebook.com">Facebook</a>
                 </li>
                 <li className="aboutme__item">
                     <a className="aboutme__link" href="https://github.com/honcharukOlha">Github</a>
                 </li>
             </ul>
             </div >
                 <div className="aboutme__photo" />
             </div>
        </section>

    );
}

export default AboutMe;