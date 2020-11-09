import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../store/store';
import { checkLogin } from '../../store/authentication/authentication';

const MainPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }
  }, [dispatch, loggingIn]);

  return (
    <div data-testid="MainPage">
      <Header history={props.history} />
      <div>MainPage</div>
      <Footer history={props.history} />
    </div>
  );
};

export default MainPage;
