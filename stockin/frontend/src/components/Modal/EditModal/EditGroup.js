import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Checkbox, Form, Button } from 'semantic-ui-react';
import { getGroupList } from '../../../store/groups/groups';

import MakeNewGroupModal from './MakeNewGroupModal';
  

const EditGroup = () => {
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
    console.log("checkedItems changed");
    setRenderItem(groupList.map((e) => RenderListItem(e)));
  }, [checkedItems]);

  const onChangeHandler = (id) => {
    let newCheckedItems = checkedItems;

    for(let i = 0; i < newCheckedItems.length; i++) {
      if(newCheckedItems[i].id === id) {
        newCheckedItems[i] = {...newCheckedItems[i], 'checked' : !newCheckedItems[i].checked};
        break;
      }
    }
    setCheckedItems(newCheckedItems);
    console.log(checkedItems);
  };

  const selectAllHandler = (data) => {
    let newCheckedItems = checkedItems;
    let checked = data.checked;
    for(let i = 0; i < newCheckedItems.length; i++) {
        newCheckedItems[i] = {...newCheckedItems[i], 'checked' : checked};
    }
    setCheckedItems(newCheckedItems);
    console.log(checkedItems);
  };

  const deleteButtonHandler = () => {
    console.log("delete button clicked");
  };

  const isChecked = (id) => {
    checkedItems.forEach((e) => {
        if(e.id === id)
            console.log("called");
            return e.checked;
    })
  };

  /** 
   * List items rendering
   */
  const RenderListItem = (e) => ( 
    <List.Item key={e.id}>
      <List.Content>
        <List.Header>
          <Checkbox 
            value={e.id}
            label={e.name} 
            onChange={() => onChangeHandler(e.id)}
          />
        </List.Header>
      </List.Content>
    </List.Item>
  );

  return (
    <Form>
      <Form.Field>
        <Checkbox onChange={(event,data) => selectAllHandler(data)}/>
        <Button content='delete' onClick = {() => deleteButtonHandler()}/>
        <List>
          {renderItem}
        </List>
      </Form.Field>
      <Form.Field>
        <MakeNewGroupModal />
      </Form.Field>
    </Form> 
  );
}

export default EditGroup;
  
