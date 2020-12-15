import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import MyInterests from '../../components/MyPage/MyInterests/MyInterests';
import MyInterestsDetail from '../../components/MyPage/MyInterestsDetail/MyInterestsDetail';
import MyInfo from '../../components/MyPage/MyInfo/MyInfo';
import Footer from '../../components/Footer/Footer';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../store/store';
import { checkLogin } from '../../store/authentication/authentication';
import { Tab } from 'semantic-ui-react';

const panes = [
  {
    menuItem: { key: 'My Interests', className: 'My Interests', content: 'My Interests' },
    render: () => <MyInterests />,
  },
  {
    menuItem: {
      key: 'My Interests Detail',
      className: 'My Interests Detail',
      content: 'My Interests Detail',
    },
    render: () => <MyInterestsDetail />,
  },
  {
    menuItem: { key: 'My Information', className: 'My Information', content: 'My Information' },
    render: () => <MyInfo />,
  },
];

const MyPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggingIn === undefined) dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }
  }, [dispatch, loggingIn]);

  return (
    <div data-testid="MyPage">
      <Header history={props.history} />
      <Container>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </Container>
      <Footer history={props.history} />
    </div>
  );
};

export default MyPage;
