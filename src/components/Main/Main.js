import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Main({ loggedIn }) {
  return (
    <main className="content">
      <Header loggedIn={loggedIn} />

      <Promo />

      <AboutProject />

      <Techs />

      <AboutMe />

      <Portfolio />

      <Footer />
    </main>
  );
}

export default Main;
