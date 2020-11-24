import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Checkbox, Form, Modal, Button } from 'semantic-ui-react';

import { getGroupList, postStock } from '../../../store/groups/groups';


/*
  Parsing url & get stock ID 
  Return value : -1 : invalid url      
*/
function getStockId() {
    var a = window.location.pathname.substr(1).split('/');
    var b = -1;
    for (var i = 0; i < a.length; i++) {
      if (a[i] === 'detail') {
        b = a[i + 1];
        break;
      }
    }
    return b;
}

const AddFavoriteModal = (props) => {
  const dispatch = useDispatch();
  const { groupList } = useSelector((state) => state.groups);
  const [open, setOpen] = useState(false);
  const [ renderItem, setRenderItem ] = useState([]);
  const [ checkedItems, setCheckedItems ] = useState([]);

  useEffect(() => {
    dispatch(getGroupList());
  }, []);

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

  const onClickConfirmHandler = () => {
      const stock = { 'id' : getStockId() };
      checkedItems.forEach((e) => {
        if(e.checked) {
            dispatch(postStock(e.id, stock));
        }
      });
      setOpen(false);
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
    <Modal
        onOpen={() => setOpen(true)}
        open={open}
        trigger={props.trigger}
    >
        <Modal.Header>그룹 선택</Modal.Header>
        <Modal.Content>
            <Form>
            <Form.Field>
                <List>
                {renderItem}
                </List>
            </Form.Field>
            </Form> 
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
            onClick={() => onClickConfirmHandler()}
            positive
            />
        </Modal.Actions>
    </Modal>
  );
}

export default AddFavoriteModal;
  
