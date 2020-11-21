import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { List, Checkbox, Form, Button, Dropdown } from 'semantic-ui-react'

import { getGroupList, deleteGroupStock } from '../../../store/groups/groups';


let groupOptions = [];

const EditStock = () => {
  const dispatch = useDispatch();
  const groupList = useSelector((state) => state.groups.groupList, shallowEqual);
  const [renderItem, setRenderItem] = useState([]);
  const checkedItem = useRef([]);

  useEffect(() => {
    dispatch(getGroupList());
  }, []);

  useEffect(() => {
    groupOptions = groupList.map((e) => ({key : e.id, text : e.name, value : e.id}));
  }, [groupList]);

  const itemOnchangeHandler = (event, data) => {
    if(data.checked) {
      checkedItem.current.push(data.value);
    }
    else {
      const idx = checkedItem.current.indexOf(data.value);
      if (idx > -1) {
        checkedItem.current.splice(idx, 1);
      } 
    }
    console.log(checkedItem.current);
  };

  const RenderListItem = (group_id, stocks) => {
    return stocks.map((s) => 
      <List.Item key={group_id + ' ' + s.id}>
          <List.Icon name='file' />
          <List.Content>
              <List.Header>
                <Checkbox 
                  defaultChecked={false}
                  label={s.title} 
                  value={group_id + ' ' + s.id}
                  onChange={(event, data) => itemOnchangeHandler(event, data)}
                />
              </List.Header>
          </List.Content>
      </List.Item>
    );
  };

  const deleteButtonHandler = () => {
    let group_id = '';
    let stock_id = '';
    let stocks = [];

    checkedItem.current.forEach((e) => {
      group_id = e.split(' ')[0];
      stock_id = e.split(' ')[1];
      dispatch(deleteGroupStock(group_id, stock_id));
    });
    dispatch(getGroupList());
  };

  const dropDownOnChangeHandler = (event, data) => {
    // 1. get value // 
    // 2. value -> get stocks // 
    // 3. stocks -> rendering  // 
    // 4. stocks : value change, re-rendering should executed. // 
    //    -> onChange handler : can capture value changes -> re-rendering.. how??
    //    -> rendering function call, re-rendering, using `reducer` state??
    // 5. stocks : each rendered component should have checkbox. //
    // 6. checkbox checked, just push value(A). //
    // 7. when delete button clicked, using (A), delete stocks from group in real DB. //
    // 8. re-rendering stock list -> how?? -> useEffect with dep `dispatch` or `groupList`
    
    let stocks = [];
    let group_id = '';
    
    groupList.forEach((e) => {
      if(e.id === data.value) {
        stocks = e.stocks;
        group_id = e.id;
      }
    });
    checkedItem.current = [];
    setRenderItem(RenderListItem(group_id, stocks));
  };

  return (
    <Form>
      <Form.Field>
        <Dropdown
            placeholder='Select Group'
            fluid
            selection
            options={groupOptions}
            onChange={(event, data) => dropDownOnChangeHandler(event, data)}
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

