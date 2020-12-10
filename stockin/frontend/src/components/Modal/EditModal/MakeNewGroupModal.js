import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'semantic-ui-react';
import { postGroup, getGroupList } from '../../../store/groups/groups';


const MakeNewGroupModal = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');

  const confirmHandler = () => {
      dispatch(postGroup({'name' : groupName}));
      dispatch(getGroupList());
      setOpen(false);
  };

  const cancelHandler = () => {
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
          </Form.Field>
          <Form.Field>
            
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