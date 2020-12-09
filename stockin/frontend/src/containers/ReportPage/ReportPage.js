import React, { useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Tab } from 'semantic-ui-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import UpTab from './UpTab';
import DownTab from './DownTap';
import { history } from '../../store/store';
import { checkLogin } from '../../store/authentication/authentication';

const panes = [
  { menuItem: '매수 추천', render: () => <UpTab /> },
  { menuItem: '매도 추천', render: () => <DownTab /> },
];

const ReportPage = (props) => {
  const dispatch = useDispatch();
  const { loggingIn } = useSelector((state) => state.authentication);
  const contextRef = createRef();

  useEffect(() => {
    if (loggingIn === undefined) dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }
  }, [dispatch, loggingIn]);

  return (
    <div className="ReportPage" data-testid="ReportPage" ref={contextRef}>
      <Header history={props.history} />
      <Container>
        <Tab panes={panes} />
      </Container>
      <Footer history={props.history} />
    </div>
  );
};

export default ReportPage;
