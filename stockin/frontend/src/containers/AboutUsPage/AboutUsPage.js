import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../store/store';
import { checkLogin } from '../../store/authentication/authentication';

import AboutUs from '../../components/AboutUs/AboutUs';

const AboutUsPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggingIn === undefined) dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }
  }, [dispatch, loggingIn]);

  return (
    <div data-testid="AboutUsPage">
      <Header history={props.history} />
      <AboutUs />
      <Footer history={props.history} />
    </div>
  );
};

export default AboutUsPage;
