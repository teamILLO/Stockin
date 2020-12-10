import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, Header } from 'semantic-ui-react';
import { postGroup, getGroupList } from '../../../store/groups/groups';


const MakeNewGroupModal = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [invalidInputText, setInvalidInputText] = useState('');

  const confirmHandler = () => {
      if(groupName.length === 0) {
        setInvalidInputText(<p style={{color : 'red'}}>  group name should be more than 1 character</p>)
        return;
      }
      dispatch(postGroup({'name' : groupName}));
      dispatch(getGroupList());

      setInvalidInputText('');
      setGroupName('');
      setOpen(false);
  };

  const cancelHandler = () => {
    setInvalidInputText('');
    setGroupName('');
    setOpen(false);
};

  return (
    <Modal
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.trigger}
    >
      <Modal.Header>Create New Group</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
              <label>New Group Name</label>
              <input 
                placeholder='New Group' 
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
              />
              {invalidInputText}
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button 
          content="Cancel"
          color='black' 
          onClick={() => cancelHandler()}
        />
        <Button
          content="Confirm"
          labelPosition='right'
          icon='checkmark'
          onClick={() => confirmHandler()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default MakeNewGroupModal;