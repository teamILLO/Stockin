import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { history } from '../../store/store';

const MainPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (!loggingIn) {
      history.push('/prelogin');
    }
  }, [loggingIn]);

  return (
    <div data-testid="MainPage">
      <Header history={props.history} />
      <div>MainPage</div>
      <Footer history={props.history} />
    </div>
  );
};

export default MainPage;
