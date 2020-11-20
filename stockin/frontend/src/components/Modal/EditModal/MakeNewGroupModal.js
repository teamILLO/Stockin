import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'semantic-ui-react';
import { postGroup, getGroupList } from '../../../store/groups/groups';


const MakeNewGroupModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');

  const confirmHandler = () => {
      dispatch(postGroup({'name' : groupName}));
      dispatch(getGroupList());
      setOpen(false);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Make New Group</Button>}
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
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
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
