import './Techs.css';

function Techs() {
    return (
        <section className="techs">
            <h3 className="techs__title">Технологии</h3>
            <p className="techs__subtitle">7 технологий</p>
            <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className="techs__block">
                <div className="techs__item">HTML</div>
                <div className="techs__item">CSS</div>
                <div className="techs__item">JS</div>
                <div className="techs__item">React</div>
                <div className="techs__item">Git</div>
                <div className="techs__item">Express.js</div>
                <div className="techs__item">mongoDB</div>
            </div>
        </section>
    );
}

export default Techs;
