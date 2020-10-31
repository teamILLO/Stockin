import React, { useState } from 'react';
import Stockin from '../../components/Stockin/Stockin';
import AboutUs from '../../components/AboutUs/AboutUs';
import Preview from '../../components/Preview/Preview';
import { Tab } from 'semantic-ui-react';
import { Button, Form, Grid } from 'semantic-ui-react';

const panes = [
  {
    menuItem: { key: 'Stockin', className: 'Stockin', content: 'About Stockin' },
    render: () => <Stockin />,
  },
  {
    menuItem: { key: 'AboutUs', className: 'AboutUs', content: 'About Us' },
    render: () => <AboutUs />,
  },
  {
    menuItem: { key: 'Preview', className: 'Preview', content: 'Preview' },
    render: () => <Preview />,
  },
];

//TODO: password find feature
const PreloginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clickSignupHandler = () => {
    //TODO: call modal
  };
  const submitHandler = () => {
    //TODO: connect with BE
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
                <Button basic primary size="large" onClick={clickSignupHandler}>
                  Signup
                </Button>
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
