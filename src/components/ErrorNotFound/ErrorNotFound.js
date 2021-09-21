import './ErrorNotFound.css';
import { Link, useHistory } from 'react-router-dom';

function ErrorNotFound() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };
  console.log(`history: ${JSON.stringify(history)}`);
  return (
    <section className="error">
      <h2 className="error__title">404</h2>
      <p className="error__subtitle">Страница не найдена</p>
      <Link to="/*" onClick={handleGoBack} className="error__button">
        Назад
      </Link>
    </section>
  );
}

export default ErrorNotFound;
