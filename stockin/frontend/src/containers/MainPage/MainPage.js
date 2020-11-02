import React from 'react';
import Header from '../../components/Header/Header';
import { Button } from 'semantic-ui-react';
import Footer from '../../components/Footer/Footer';

const MainPage = (props) => {
  return (
    <div data-testid="MainPage">
      <Header history={props.history} />
      <div>MainPage</div>
      <Footer history={props.history} />
    </div>
  );
};

export default MainPage;
