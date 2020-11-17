import React, { useState } from 'react';
import { Button, Form, Image, Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { trySignup } from '../../../store/authentication/authentication';
import { api } from '../../../api/index';

import logo from '../../../images/logo.png';
import './SignupModal.css';

const SignupModal = (props) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [next, setNext] = useState(false);

  const dispatch = useDispatch();

  const signupHandler = async () => {
    let is_duplicated = false

    await api.post('/users/duplicate/', { email: '', nickname : nickname }).then((response) => {
      if (response.data['duplicate']) {
        alert('Nickname exists, try another.');
        is_duplicated = true;
      } 
    });

    if(!is_duplicated) {
      dispatch(trySignup({ email: email, nickname: nickname, password: password }));
      alert('Sign up succesfully'); 
      setOpen(false);
    }
  };

  const nextHandler = async () => {
    let is_duplicated = false

    await api.post('/users/duplicate/', { email: email, nickname : '' }).then((response) => {
      if (response.data['duplicate']) {
        alert('Email exists, try another.');
        is_duplicated = true
      } 
    });
    
    if(!is_duplicated) {
      setNext(true);
    }
  };

  const inputs = next ? (
    <Form size="small">
      <Form.Input
        fluid
        icon="id card outline"
        iconPosition="left"
        placeholder="Nickname"
        value={nickname}
        onChange={(event) => setNickname(event.target.value)}
      />
    </Form>
  ) : (
    <Form size="small">
      <Form.Input
        fluid
        icon="user"
        iconPosition="left"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Form.Input
        fluid
        icon="lock"
        iconPosition="left"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </Form>
  );

  const nextButton = next ? (
    <Button primary onClick={() => signupHandler()}>
      Sign Up
    </Button>
  ) : (
    <Button primary onClick={() => nextHandler()}>
      Next
    </Button>
  );

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => {
        setNext(false);
        setOpen(true);
      }}
      open={open}
      size="small"
      trigger={props.trigger}
    >
      <Image src={logo} centered className="logo" />

      <Modal.Content>
        <p>Welcome!</p>
        <h2>WELCOME TO STOCKIN!</h2>
        {inputs}
      </Modal.Content>
      <Modal.Actions>{nextButton}</Modal.Actions>
    </Modal>
  );
};

export default SignupModal;
