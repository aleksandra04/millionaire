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
    <main>
      <div>Final</div>
      <div>
        <p>total score</p>
        <p>{`$${result} earned`}</p>
        <Link to="/">Try again</Link>
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
