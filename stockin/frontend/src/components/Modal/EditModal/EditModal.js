import React, { useState } from 'react';
import { Button, Modal, Tab } from 'semantic-ui-react';

import EditGroup from './EditGroup';
import EditStock from './EditStock';

const panes = [
  { menuItem: 'Stock Edit', render: () => <Tab.Pane><EditStock /></Tab.Pane> },
  { menuItem: 'Group Edit', render: () => <Tab.Pane><EditGroup /></Tab.Pane> },
]

const EditModal = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.trigger}
    >
      <Modal.Header>Edit Page</Modal.Header>
      <Modal.Content>
        <Tab panes={panes} />
      </Modal.Content>
      <Modal.Actions>
        <Button 
          color='black' 
          content="Cancel" 
          onClick={() => setOpen(false)} 
        />
        <Button
          content="Confirm"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditModal;