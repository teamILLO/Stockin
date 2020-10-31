import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const AboutUsPage = (props) => {
  return (
    <div>
      <Header history={props.history} />
      <div>AboutUsPage</div>
      <Footer history={props.history} />
    </div>
  );
};

export default AboutUsPage;
