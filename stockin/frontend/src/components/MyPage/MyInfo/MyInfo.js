import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Label, Grid } from 'semantic-ui-react';
import { updateUserInfo } from '../../../store/authentication/authentication';
import { api } from '../../../api/index';

const MyInfo = (props) => {
  const { user } = useSelector((state) => state.authentication);
  const [nicknameInput, setNicknameInput] = useState('');
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const changeNick = async () => {
    let is_duplicated = false;

    await api.post('/users/duplicate/', { email: '', nickname : nicknameInput }).then((response) => {
      if (response.data['duplicate']) {
        alert('Nickname exists, try another.');
        is_duplicated = true;
      } 
    });

    if(!is_duplicated) {
      dispatch(updateUserInfo({ change: 'nickname', email: user.email, nickname: nicknameInput }));
      setEdit(false);
      alert('nickname changed succesfully');
    }
  };

  const clickEdit = () => {
    setEdit(true);
    setNicknameInput(user.nickname);
  };

  if (!edit)
    return (
      <div className="MyInfo" data-testid="MyInfo">
        <Grid centered>
          <Grid.Row>
            <Label content="Mail" />
            {user && user.email}
          </Grid.Row>
          <Grid.Row>
            <Label content="nickname" />
            {user && user.nickname}
          </Grid.Row>
          <Grid.Row>
            <Button onClick={() => clickEdit()}>Edit!</Button>
          </Grid.Row>
        </Grid>
      </div>
    );
  else
    return (
      <div className="MyInfoEdit" data-testid="MyInfoEdit">
        <Grid centered>
          <Grid.Row>
            <Label content="Mail" />
            {user && user.email}
          </Grid.Row>
          <Grid.Row>
            <Label content="nickname" />
            <Input
              name="nicknameInput"
              value={nicknameInput}
              onChange={(event) => setNicknameInput(event.target.value)}
            />
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
