import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const MainPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const history = useHistory();

  useEffect(() => {
    if (!loggingIn) {
      history.push('/prelogin');
    }
  }, [history, loggingIn]);

  return (
    <div data-testid="MainPage">
      <Header history={props.history} />
      <div>MainPage</div>
      <Footer history={props.history} />
    </div>
  );
};

export default MainPage;
