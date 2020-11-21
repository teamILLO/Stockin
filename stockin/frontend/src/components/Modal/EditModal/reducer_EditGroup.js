import React, { useEffect, useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Checkbox, Form, Button } from 'semantic-ui-react'

import MakeNewGroupModal from './MakeNewGroupModal';

/** 
 * List items rendering
 */
const RenderListItem = (e) => {
    console.log("RenderListItem called");
    return ( 
        <List.Item key={e.id}>
            <List.Content>
            <List.Header>
                <Checkbox 
                    value={e.id}
                    label={e.name} 
                />
            </List.Header>
            </List.Content>
        </List.Item>
    );
};

const initialState = {
    checkedItems : [],
    renderItem : [],
};

// Using reducer for state change
function groupReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_CHECKED_ITEMS':
            let newCheckedItems = action.groupList.map((e) =>{
                let dict = {};
                dict['id'] = e.id; 
                dict['checked'] = false;
                return dict;
            });
            return {...state, checkedItems : newCheckedItems};
        case 'UPDATE_RENDER_ITEM':
            console.log(action.groupList);
            let newRenderItem = action.groupList.map((e) => RenderListItem(e));
            return {...state, renderItem : newRenderItem};
        default:
            return;
    }
}

/** 
  * Make array with value in checkbox, which composed to "stock's id"
  */
const EditGroup = () => {
  const { groupList } = useSelector((state) => state.groups);
  const [state, dispatch] = useReducer(groupReducer, initialState);

  useEffect(() => {
    // call reducer -> state change
    console.log(groupList);
    console.log("useEffect called");
    dispatch({type : 'UPDATE_CHECKED_ITEMS', groupList : groupList});
    dispatch({type : 'UPDATE_RENDER_ITEM', groupList : groupList});
  }, [groupList]);

  /** 
   * Iterate `checked`, If id exists, delete it from `checked`. O.W. push it to `checked`
   */
//   const onChangeHandler = (id) => {
//     console.log("onChangeHandler called");
//     console.log(checkedItems);
//     let newCheckedItems = checkedItems;
//     let i;

//     for(i = 0; i < newCheckedItems.length; i++) {
//       if(newCheckedItems[i].id === id) {
//         newCheckedItems[i] = {...newCheckedItems[i], 'checked' : !newCheckedItems[i].checked};
//         break;
//       }
//     }
//     console.log(newCheckedItems);
//     setCheckedItems(newCheckedItems);
//   };
  
  const deleteButtonHandler = () => {
    console.log("delete button clicked");
  };

  return (
    <Form>
      <Form.Field>
        <Checkbox  />
        <Button content='delete' onClick = {() => deleteButtonHandler()}/>
        <List>
          {state.renderItem}
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