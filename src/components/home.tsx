import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.scss';

function Home(): JSX.Element {
  return (
    <main className="home">
      <div className="home__background">
        <div className="home__wrapper">
          <div className="home__logo" />
          <div className="home__info">
            <p className="home__info-text">Who wants to be a millionaire?</p>
            <Link to="/game" className="button">Start</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
