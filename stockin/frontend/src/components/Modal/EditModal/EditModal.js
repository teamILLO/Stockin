import React, { useState } from 'react';
import { Button, Modal, Tab } from 'semantic-ui-react';

import EditGroup from './EditGroup';
import EditStock from './EditStock';

const panes = [
  { menuItem: '그룹 수정', render: () => <Tab.Pane><EditGroup /></Tab.Pane> },
  { menuItem: '종목 수정', render: () => <Tab.Pane><EditStock /></Tab.Pane> },
]

const EditModal = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.trigger}
    >
      <Modal.Header>관심종목 관리</Modal.Header>
      <Modal.Content>
        <Tab panes={panes} />
      </Modal.Content>
      <Modal.Actions>
        <Button 
          color='black' 
          content="취소" 
          onClick={() => setOpen(false)} 
        />
        <Button
          content="확인"
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