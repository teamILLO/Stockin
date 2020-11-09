import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../store/store';
import { trySignout } from '../../store/authentication/authentication';
import { checkLogin } from '../../store/authentication/authentication';

const MyPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const { user } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const onClickSignoutHandler = () => {
    dispatch(trySignout(user));
  };

  useEffect(() => {
    dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }
  }, [dispatch, loggingIn]);

  return (
    <div data-testid="MyPage">
      <Header history={props.history} />
      <div>MyPage</div>
      <Button secondary onClick={onClickSignoutHandler}>
        SIGNOUT
      </Button>
      <Footer history={props.history} />
    </div>
  );
};

export default MyPage;
