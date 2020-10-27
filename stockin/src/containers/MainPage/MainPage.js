import React from 'react';
import Header from '../../components/Header/Header';
import { Button } from 'semantic-ui-react';

const MainPage = (props) => {
  return (
    <div>
      <Header history={props.history} />
      <div>MainPage</div>
    </div>
  );
};

export default MainPage;
