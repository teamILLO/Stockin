import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Checkbox, Form, Button } from 'semantic-ui-react';
import { deleteGroup } from '../../../store/groups/groups';

import MakeNewGroupModal from './MakeNewGroupModal';
  

const EditGroup = (props) => {
  const dispatch = useDispatch();
  const { groupList } = useSelector((state) => state.groups);
  const [ renderItem, setRenderItem ] = useState([]);
  const [ checkedItems, setCheckedItems ] = useState([]);

  useEffect(() => {
    setCheckedItems(groupList.map((e) => {
      let dict = {};
      dict['id'] = e.id; 
      dict['checked'] = false;
      return dict;
    }));
  }, [groupList]);

  useEffect(() => {
    setRenderItem(groupList.map((e) => RenderListItem(e)));
  }, [checkedItems]);

  const onChangeHandler = (event, data) => {
    let id = data.value;
    let checked = data.checked;
    let newCheckedItems = checkedItems;

    for(let i = 0; i < newCheckedItems.length; i++) {
      if(newCheckedItems[i].id === id) {
        newCheckedItems[i] = {...newCheckedItems[i], 'checked' : checked};
        break;
      }
    }
    setCheckedItems(newCheckedItems);
  };

  const deleteButtonHandler = () => {
    checkedItems.forEach((e) => {
        if(e.checked) {
            dispatch(deleteGroup(e.id)); 
        }
    });
  };

  const RenderListItem = (e) => ( 
    <List.Item key={e.id}>
      <List.Content>
        <List.Header>
          <Checkbox 
            value={e.id}
            label={e.name} 
            onChange={(event, data) => onChangeHandler(event, data)}
          />
        </List.Header>
      </List.Content>
    </List.Item>
  );

  return (
    <Form>
      <Form.Field>
        <Button content='delete' onClick = {() => deleteButtonHandler()}/>
        <List>
          {renderItem}
        </List>
      </Form.Field>
      <Form.Field>
        <MakeNewGroupModal trigger={<Button>Make New Group</Button>}/>
      </Form.Field>
    </Form> 
  );
}

export default EditGroup;
  
