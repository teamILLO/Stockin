import React, { useEffect, useState, useDispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Checkbox, Form, Button } from 'semantic-ui-react';
import { getGroupList } from '../../../store/groups/groups';

import MakeNewGroupModal from './MakeNewGroupModal';

/** 
  * Make array with value in checkbox, which composed to "stock's id"
  */
const EditGroup = () => {
  const { groupList } = useSelector((state) => state.groups);
  const [ renderItem, setRenderItem ] = useState([]);
  const [ checkedItems, setCheckedItems ] = useState([]);

  useEffect(() => {
    setCheckedItems(checkedItems => groupList.map((e) => {
      let dict = {};
      dict['id'] = e.id; 
      dict['checked'] = false;
      console.log(dict);
      return dict;
    }));
    setRenderItem(groupList.map((e) => RenderListItem(e)));
  }, [groupList]);

  /** 
   * Iterate `checked`, If id exists, delete it from `checked`. O.W. push it to `checked`
   */
  const onChangeHandler = (id) => {
    console.log(checkedItems);
    let newCheckedItems = checkedItems;
    let i;

    for(i = 0; i < newCheckedItems.length; i++) {
      if(newCheckedItems[i].id === id) {
        newCheckedItems[i] = {...newCheckedItems[i], 'checked' : !newCheckedItems[i].checked};
        break;
      }
    }
    console.log(newCheckedItems);
    setCheckedItems(newCheckedItems);
  }
  
  const deleteButtonHandler = () => {
    console.log("delete button clicked");
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
        <Checkbox  />
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


// const RenderListItem = (e) => {
//   var stocks = e.stocks.map((s) => 
//       <List.Item key={s.id}>
//           <List.Icon name='file' />
//           <List.Content>
//               <List.Header>{s.title}<Checkbox/></List.Header>
//           </List.Content>
//       </List.Item>
//   );
  
//   return (
//       <List.Item key={e.id}>
//           <List.Content>
//               <List.Header><Checkbox />{e.name}</List.Header>
//               <List.List>{stocks}</List.List>
//           </List.Content>
//       </List.Item>
//   );
// };