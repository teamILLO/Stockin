import React from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PreloginPage from './containers/PreloginPage/PreloginPage';
import MainPage from './containers/MainPage/MainPage';
import ReportPage from './containers/ReportPage/ReportPage';
import MyPage from './containers/MyPage/MyPage';
import AboutUsPage from './containers/AboutUsPage/AboutUsPage';
import DetailPage from './containers/DetailPage/DetailPage';
import CSRFToken from './csrftoken';
const App = (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" data-testid="App">
        <CSRFToken />
        <Switch>
          <Route path="/prelogin" exact component={PreloginPage} />
          <Route path="/main" exact component={MainPage} />
          <Route path="/report" exact component={ReportPage} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/aboutus" exact component={AboutUsPage} />
          <Route path="/detail/:id" exact component={DetailPage} />
          <Redirect exact from="/" to="prelogin" />
          <Route render={() => <h1 data-testid="NotFound">Not Found</h1>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
};

export default App;
