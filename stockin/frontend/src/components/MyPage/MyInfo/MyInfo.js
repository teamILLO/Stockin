import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Grid, Table, Image, Header } from 'semantic-ui-react';
import { updateUserInfo } from '../../../store/authentication/authentication';
import { api } from '../../../api/index';
import { trySignout } from '../../../store/authentication/authentication';

import './MyInfo.css';

const avatar = [
  'avatar/large/ade.jpg',
  'avatar/large/chris.jpg',
  'avatar/large/christian.jpg',
  'avatar/large/daniel.jpg',
  'avatar/large/elliot.jpg',
  'avatar/large/helen.jpg',
  'avatar/large/jenny.jpg',
  'avatar/large/joe.jpg',
  'avatar/large/justen.jpg',
  'avatar/large/laura.jpg',
  'avatar/large/matt.jpg',
  'avatar/large/nan.jpg',
  'avatar/large/steve.jpg',
  'avatar/large/stevie.jpg',
  'avatar/large/veronika.jpg',
  'avatar2/large/elyse.png',
  'avatar2/large/kristy.png',
  'avatar2/large/lena.png',
  'avatar2/large/lindsay.png',
  'avatar2/large/mark.png',
  'avatar2/large/matthew.png',
  'avatar2/large/molly.png',
  'avatar2/large/patrick.png',
  'avatar2/large/rachel.png',
];

const MyInfo = (props) => {
  const { user } = useSelector((state) => state.authentication);
  const [nicknameInput, setNicknameInput] = useState('');
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const changeNick = async () => {
    let is_duplicated = false;
    if (user.nickname === nicknameInput) {
      alert("Nickname doesn't change!");
      return;
    }
    await api.post('/users/duplicate/', { email: '', nickname: nicknameInput }).then((response) => {
      if (response.data['duplicate']) {
        alert('Nickname exists, try another.');
        is_duplicated = true;
      }
    });

    if (!is_duplicated) {
      dispatch(updateUserInfo({ change: 'nickname', email: user.email, nickname: nicknameInput }));
      setEdit(false);
      alert('nickname changed succesfully');
    }
  };

  const clickEdit = () => {
    setEdit(true);
    setNicknameInput(user.nickname);
  };

  const onClickSignoutHandler = () => {
    const r = window.confirm('Do you really want to Sign Out?');
    if (r === true) {
      dispatch(trySignout(user));
    }
  };

  if (!edit)
    return (
      <div className="MyInfo" data-testid="MyInfo">
        <Grid centered>
          <Grid.Row>
            <Image
              src={'https://semantic-ui.com/images/' + avatar[user.id % 24]}
              size="medium"
              circular
              className="avatar"
            />
          </Grid.Row>
          <Grid.Row>
            <div style={{ width: 500 }}>
              <Table basic="very" celled className="myinfoTable">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={2}>
                      <Header as="h2">Mail</Header>
                    </Table.Cell>
                    <Table.Cell width={5} textAlign="right">
                      <Header as="h5">{user && user.email}</Header>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={2}>
                      <Header as="h2">Nickname</Header>
                    </Table.Cell>
                    <Table.Cell width={5} textAlign="right">
                      <Header as="h5">{user && user.nickname}</Header>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </Grid.Row>
          <Grid.Row>
            <Button onClick={() => clickEdit()} color="grey">
              Edit!
            </Button>
            <Button onClick={onClickSignoutHandler} color="red">
              SIGNOUT
            </Button>
          </Grid.Row>
        </Grid>
      </div>
    );
  else
    return (
      <div className="MyInfoEdit" data-testid="MyInfoEdit">
        <Grid centered>
          <Grid.Row>
            <Image
              src={'https://semantic-ui.com/images/' + avatar[user.id % 24]}
              size="medium"
              circular
              className="avatar"
            />
          </Grid.Row>
          <Grid.Row>
            <div style={{ width: 500 }}>
              <Table basic="very" celled className="myinfoTable">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={2}>
                      <Header as="h2">Mail</Header>
                    </Table.Cell>
                    <Table.Cell width={5} textAlign="right">
                      <Header as="h5">{user && user.email}</Header>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={2}>
                      <Header as="h2">Nickname</Header>
                    </Table.Cell>
                    <Table.Cell width={5} textAlign="right">
                      <Input
                        name="nicknameInput"
                        value={nicknameInput}
                        onChange={(event) => setNicknameInput(event.target.value)}
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </Grid.Row>
          <Grid.Row>
            <Button onClick={() => changeNick()}>Confirm!</Button>
            <Button onClick={() => setEdit(false)}>Cancel!</Button>
          </Grid.Row>
        </Grid>
      </div>
    );
};

export default MyInfo;
