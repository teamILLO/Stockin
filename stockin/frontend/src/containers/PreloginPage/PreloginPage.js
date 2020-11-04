import React, { useState } from 'react';
import Stockin from '../../components/Stockin/Stockin';
import AboutUs from '../../components/AboutUs/AboutUs';
import Preview from '../../components/Preview/Preview';
import { Tab } from 'semantic-ui-react';

import { Button, Form, Grid } from 'semantic-ui-react';
import { tryLogin } from '../../store/authentication';
import { useDispatch } from 'react-redux';
import SignupModal from '../../components/Modal/SignupModal/SignupModal';

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

  const dispatch = useDispatch();

  const submitHandler = () => {
    const submitEmail = email;
    const submitPassword = password;
    console.log(submitEmail, submitPassword);
    dispatch(tryLogin({ email: submitEmail, password: submitPassword }));
  };

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
