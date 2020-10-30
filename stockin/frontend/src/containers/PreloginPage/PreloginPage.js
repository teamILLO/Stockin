import React, { useState } from 'react';
import Stockin from '../../components/Stockin/Stockin';
import AboutUs from '../../components/AboutUs/AboutUs';
import Preview from '../../components/Preview/Preview';
import CircularPercentage from '../../components/CircularPercentage/CircularPercentage';
import HalfCircularScore from '../../components/HalfCircularScore/HalfCircularScore';

//TODO: password find feature
const PreloginPage = (props) => {
  const [tab, setTab] = useState('STOCKIN');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const clickLoginHandler = () => {
    //TODO: call modal
  };

  const clickStockinHandler = () => {
    setTab('STOCKIN'); //TODO: fill this
  };

  const clickAboutusHandler = () => {
    setTab('ABOUTUS');
  };

  const clickPreviewHandler = () => {
    setTab('PREVIOUS');
  };

  const selectedTab =
    tab === 'STOCKIN' ? <Stockin /> : tab === 'ABOUTUS' ? <AboutUs /> : <Preview />;

  return (
    <div className="PreloginPage" data-testid="PreloginPage">
      Prelogin Page
      <br />
      <div className="email">
        Email:
        <input id="email" onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div className="password">
        Password:
        <input id="password" onChange={(event) => setPassword(event.target.value)} />
      </div>
      {/*        Modal TODO          */}
      <div className="loginButton">
        <button id="login-button" onClick={clickLoginHandler}>
          Login
        </button>
      </div>
      <div className="stockinTabButton">
        <button id="stockin-tab-button" onClick={clickStockinHandler}>
          Stockin
        </button>
      </div>
      <div className="aboutusTabButton">
        <button id="aboutus-tab-button" onClick={clickAboutusHandler}>
          About Us
        </button>
      </div>
      <div className="previewTabButton">
        <button id="preview-tab-button" onClick={clickPreviewHandler}>
          Preview
        </button>
      </div>
      {selectedTab}
    </div>
  );
};

export default PreloginPage;
