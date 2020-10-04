import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReduxState } from '../types';

interface Props {
  result: [number, string, null],
}

const Final = ({ result }: Props): JSX.Element => {
  const history = useHistory();

  useEffect(() => {
    !result && history.push('/');
  }, [result]);

  return (
    <main className="home__background">
      <div className="home__wrapper">
        <div className="home__logo" />
        <div className="home__info">
          <p className="home__info-headind">total score</p>
          <p className="home__info-text">{`$${result && result.toLocaleString()} earned`}</p>
          <Link to="/" className="button">Try again</Link>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  result: state.result,
});

export default connect(
  mapStateToProps,
  null,
)(Final);
