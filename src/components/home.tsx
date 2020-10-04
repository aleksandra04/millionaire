import React from 'react';
import { Link } from 'react-router-dom';

function Home(): JSX.Element {
  return (
    <main>
      <div>logo</div>
      <div>
        <p>Who wants to be a millionaire?</p>
        <Link to="/game">start</Link>
      </div>
    </main>
  );
}

export default Home;
