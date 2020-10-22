import React from 'react';
import Header from '../../components/Header/Header';

const MainPage = (props) => {
  return (
    <div>
      <Header history={props.history} />
    </div>
  );
};

export default MainPage;
