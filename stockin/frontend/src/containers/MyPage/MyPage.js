import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { history } from '../../store/store';

const MyPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (!loggingIn) {
      history.push('/prelogin');
    }
  }, [loggingIn]);

  return (
    <div data-testid="MyPage">
      <Header history={props.history} />
      <div>MyPage</div>
      <Footer history={props.history} />
    </div>
  );
};

export default MyPage;
