import './Header.css';
import React from 'react';
import Navigation from '../Navigation/Navigation.js';
import HeaderAuth from '../HeaderAuth/HeaderAuth';

function Header({ loggedIn }) {
  const [navigationOpen, setNavigationOpen] = React.useState(false);

  function handleOpen() {
    setNavigationOpen(true);
  }

  function handleClose() {
    setNavigationOpen(false);
  }

  return (
    <>
      {loggedIn ? (
        <header className="header">
          <Navigation isOpen={navigationOpen} onClose={handleClose} />
          <button onClick={handleOpen} className="header__burger-button" />
        </header>
      ) : (
        <HeaderAuth />
      )}
    </>
  );
}

export default Header;
