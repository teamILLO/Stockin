import React, { useState, useEffect } from 'react';
import Stockin from '../../components/Stockin/Stockin';
import AboutUs from '../../components/AboutUs/AboutUs';
import Preview from '../../components/Preview/Preview';
import { Tab, Button, Form, Grid, Checkbox, Item } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../store/store';
import { tryLogin, checkLogin } from '../../store/authentication/authentication';
import SignupModal from '../../components/Modal/SignupModal/SignupModal';
import FindPasswdModal from '../../components/Modal/FindPasswdModal/FindPasswdModal';
import { api } from '../../api/index';
const panes = [
  {
    menuItem: 'About Stockin',
    render: () => <Stockin />,
  },
  {
    menuItem: 'About Us',
    render: () => <AboutUs />,
  },
  {
    menuItem: 'Preview',

    render: () => <Preview />,
  },
];

//TODO: password find feature
const PreloginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loggingIn } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const submitHandler = () => {
    const submitEmail = email;
    const submitPassword = password;
    dispatch(tryLogin({ email: submitEmail, password: submitPassword }));
  };

  useEffect(() => {
    if (loggingIn === undefined) dispatch(checkLogin());
    if (loggingIn === true) {
      history.push('/main');
    }
  }, [dispatch, loggingIn]);

  return (
    <div className="PreloginPage" data-testid="PreloginPage">
      Prelogin Page
      <br />
      <div>
        <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
          <Grid.Column width={7}>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form size="large">
                <Form.Input
                  data-testid="inputEmail"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Form.Input
                  data-testid="inputPassword"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <Checkbox label="Remember Me" />
                <FindPasswdModal trigger={<Item as="a" content="Forget Password?" />} />

                <Button primary size="large" onClick={submitHandler}>
                  Login
                </Button>
                <SignupModal
                  trigger={
                    <Button basic primary size="large">
                      Sign up
                    </Button>
                  }
                />
              </Form>
            </Grid.Column>
          </Grid.Column>
          <Grid.Column width={7}>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default PreloginPage;
