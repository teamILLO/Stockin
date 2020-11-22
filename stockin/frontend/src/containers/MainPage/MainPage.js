import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../store/store';
import { checkLogin } from '../../store/authentication/authentication';
import StockBlock from '../../components/StockBlock/StockBlock';


const MainPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggingIn === undefined) dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }
  }, [dispatch, loggingIn]);

  return (
    <div data-testid="MainPage">
      <Header history={props.history} />
      <StockBlock id={1}/>
      <Footer history={props.history} />
    </div>
  );
};

export default MainPage;
