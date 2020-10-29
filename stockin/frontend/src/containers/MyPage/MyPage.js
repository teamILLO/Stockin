import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const MyPage = (props) => {
  return (
    <div className="MyPage">
      <Header history={props.history} />
      <div>MyPage</div>
      <Footer history={props.history} />
    </div>
  );
};

export default MyPage;
