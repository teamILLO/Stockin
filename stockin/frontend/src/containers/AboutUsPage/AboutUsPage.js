import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AboutUsPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const history = useHistory();

  useEffect(() => {
    if (!loggingIn) {
      history.push('/prelogin');
    }
  }, [history, loggingIn]);

  return (
    <div data-testid="AboutUsPage">
      <Header history={props.history} />
      <div>AboutUsPage</div>
      <Footer history={props.history} />
    </div>
  );
};

export default AboutUsPage;
