import React, { useState } from 'react';
import { Button, Form, Image, Modal } from 'semantic-ui-react';
import logo from '../../../images/logo.png';

import { api } from '../../../api/index';

const FindPasswdModal = (props) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [password, setPassword] = useState('');
  const [next, setNext] = useState(1);

  const sendEmail = async () => {
    let random = 0;
    let number = '';
    for (let i = 0; i < 6; i++) {
      random = Math.floor(Math.random() * 10);
      number += random;
    }
    setCodeSent(number);
    await api.post('/users/sendCode/', { email: email, code: number });
  };

  const emailConfirmHandler = async () => {

    await api.post('/users/duplicate/', { email: email, nickname : '' }).then((response) => {
      if (response.data['duplicate']) {
        sendEmail();
        setNext(2);
      }
      else 
        alert('Email does not exist!');
    });
  };

  const codeConfirmHandler = () => {
    if (codeInput === codeSent) setNext(3);
    else alert('Invalid Code!');
  };

  const changeHandler = () => {
    api.put('/users/userInfo/', { change: 'password', email: email, password: password });
    alert('password changed succesfully');
    setOpen(false);
  };

  const inputs = () => {
    if (next === 1)
      return (
        <Form>
          <h2>Please enter your email</h2>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form>
      );
    else if (next === 2)
      return (
        <Form>
          <h2>Please enter the code sent to you by email</h2>
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="CODE"
            value={codeInput}
            onChange={(event) => setCodeInput(event.target.value)}
          />
        </Form>
      );
    else 
      return (
        <Form>
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="New Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form>
      );
  };

  const nextButton = () => {
    if (next === 1)
      return (
        <Button primary onClick={() => emailConfirmHandler()}>
          Next
        </Button>
      );
    else if (next === 2)
      return (
        <Button primary onClick={() => codeConfirmHandler()}>
          Next!
        </Button>
      );
    else 
      return (
        <Button primary onClick={() => changeHandler()}>
          Confirm
        </Button>
      );
  };

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => {
        setNext(1);
        setEmail('');
        setCodeInput('');
        setPassword('');
        setOpen(true);
      }}
      open={open}
      size="small"
      trigger={props.trigger}
    >
      <Image src={logo} centered className="logo" />
      {next}
      <Modal.Content>
        <h4>Find your password!</h4>
        {inputs()}
      </Modal.Content>
      <Modal.Actions>{nextButton()}</Modal.Actions>
    </Modal>
  );
};

export default FindPasswdModal;
