import './Preloader.css';
import React from 'react';

function Preloader({ isLoading }) {
  return (
    <div className={`preloader ${isLoading ? 'preloader_active' : ''}`}>
      <div className="preloader__block">
        <span className="preloader__loading"></span>
      </div>
    </div>
  );
}

export default Preloader;
