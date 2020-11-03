import React, { useEffect, useState } from 'react';
import Stockin from '../../components/Stockin/Stockin';
import AboutUs from '../../components/AboutUs/AboutUs';
import Preview from '../../components/Preview/Preview';
import CSRFToken from '../../csrftoken';
import CommentBlock from '../../components/CommentBlock/CommentBlock';
import { Tab } from 'semantic-ui-react';

import { Button, Form, Grid, Header, Image, Message, Segment,Checkbox, Item } from 'semantic-ui-react';
import { tryLogin } from '../../store/authentication';
import { useDispatch } from 'react-redux';
import SignupModal from '../../components/Modal/SignupModal/SignupModal';
import FindPasswdModal from '../../components/Modal/FindPasswdModal/FindPasswdModal';

const panes = [
  {
    menuItem: 'Stockin',
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

                <Checkbox
                  label="Remember Me"
                />
                <FindPasswdModal
                  trigger={
                    <Item as="a" content="Forget Password?"/>
                  }
                />

                <Button color="primary" size="large" onClick={submitHandler}>
                  Login
                </Button>
                <SignupModal
                  trigger={
                    <Button basic color="primary" size="large">
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
