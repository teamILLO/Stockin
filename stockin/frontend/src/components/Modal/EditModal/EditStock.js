import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Checkbox, Form, Button, Dropdown } from 'semantic-ui-react'

import MakeNewGroupModal from './MakeNewGroupModal';

const groupOptions = [
    {
      key: 'Jenny Hess',
      text: 'Jenny Hess',
      value: 'Jenny Hess',
      image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
    },
    {
      key: 'Elliot Fu',
      text: 'Elliot Fu',
      value: 'Elliot Fu',
      image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
    },
]


const EditStock = () => {
  const dispatch = useDispatch();
  const { groupList } = useSelector((state) => state.groups);
  const [renderItem, setRenderItem] = useState([]);

  // for checkbox
  const [selectAll, setselectAll] = useState(false);

  /** 
   * List items rendering
   */
  const RenderListItem = (e) => {
    var stocks = e.stocks.map((s) => 
        <List.Item key={s.id}>
            <List.Icon name='file' />
            <List.Content>
                <List.Header>{s.title}<Checkbox/></List.Header>
            </List.Content>
        </List.Item>
    );
    
    return (
        <List.Item key={e.id}>
            <List.Content>
                <List.Header><Checkbox />{e.name}</List.Header>
                <List.List>{stocks}</List.List>
            </List.Content>
        </List.Item>
    );
  };

  const deleteButtonHandler = () => {
    console.log("delete button clicked");
  };

  useEffect(() => {
    setRenderItem(groupList.map((e) => RenderListItem(e)));
  }, [groupList]);

  return (
    <Form>
      <Form.Field>
        <Dropdown
            placeholder='Select Friend'
            fluid
            selection
            options={groupOptions}
        />
        <Button content='delete' onClick = {() => deleteButtonHandler()}/>
        <List>
          {renderItem}
        </List>
      </Form.Field>
    </Form> 
  );
}

export default EditStock;


