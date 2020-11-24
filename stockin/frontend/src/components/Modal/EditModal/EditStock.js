import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Checkbox, Form, Button, Dropdown } from 'semantic-ui-react'

import { getGroupList, deleteGroupStock } from '../../../store/groups/groups';

let groupOptions = [];

const EditStock = () => {
  const dispatch = useDispatch();
  const { groupList } = useSelector((state) => state.groups);
  const [renderItem, setRenderItem] = useState([]);
  const checkedItem = React.useRef([]);

  useEffect(() => {
    dispatch(getGroupList());
  }, []);

  useEffect(() => {
    groupOptions = groupList.map((e) => ({key : e.id, text : e.name, value : e.id}));
    if(checkedItem.current.length !== 0) {
      let group_id = checkedItem.current[0].split(' ')[0];
      let stocks;
      groupList.forEach((e) => {
        if(e.id === Number(group_id)) {
          stocks = e.stocks;
          group_id = e.id;
          checkedItem.current = [];
          setRenderItem(RenderListItem(group_id, stocks));
        }
      });
    }
  }, [groupList]);

  const itemOnchangeHandler = (event, data) => {
    if(data.checked) {
      checkedItem.current.push(data.value);
    }
    else {
      const idx = checkedItem.current.indexOf(data.value);
      checkedItem.current.splice(idx, 1); 
    }
  };

  const RenderListItem = (group_id, stocks) => {
    return stocks.map((s) => 
      <List.Item key={group_id + ' ' + s.id}>
          <List.Icon name='file' />
          <List.Content>
              <List.Header>
                <Checkbox 
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

    checkedItem.current.forEach((e) => {
      group_id = e.split(' ')[0];
      stock_id = e.split(' ')[1];
      dispatch(deleteGroupStock(group_id, stock_id));
    });
  };

  const dropDownOnChangeHandler = (event, data) => {
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
            placeholder='그룹 선택'
            fluid
            selection
            options={groupOptions}
            onChange={(event, data) => dropDownOnChangeHandler(event, data)}
        />
        <List>
          {renderItem}
        </List>
      </Form.Field>
      <Form.Field>
        <Button content='삭제' onClick = {() => deleteButtonHandler()}/>
      </Form.Field>
    </Form> 
  );
}

export default EditStock;


