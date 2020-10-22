import React from 'react';
import Header from '../../components/Header/Header';

const MyPage = (props) => {
  return (
    <div>
      <Header history={props.history} />
    </div>
  );
};

export default MyPage;
