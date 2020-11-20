import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Checkbox, Form, Button } from 'semantic-ui-react'

import MakeNewGroupModal from './MakeNewGroupModal';


const EditGroup = () => {
  const dispatch = useDispatch();
  const { groupList } = useSelector((state) => state.groups);
  const [renderItem, setRenderItem] = useState([]);

  // for checkbox
  const [selectAll, setselectAll] = useState(false);

  /** 
   * List items rendering
   */
  const RenderListItem = (e) => {    
    return (
      <List.Item key={e.id}>
        <List.Content>
          <List.Header><Checkbox label={e.name} /></List.Header>
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
        <Checkbox />
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