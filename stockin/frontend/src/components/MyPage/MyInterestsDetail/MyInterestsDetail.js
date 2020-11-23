import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Button, Menu, Input } from 'semantic-ui-react';

import GroupStock from './GroupStock';
import EditModal from '../../Modal/EditModal/EditModal';
import { getGroupList } from '../../../store/groups/groups';

/*
 Using dyanmic pane,
 add, edit, show groups 
*/
const MyInterestsDetail = () => {
  const dispatch = useDispatch();
  const { groupList } = useSelector((state) => state.groups);
  const [panes, setPanes] = useState([]);

  const groupListChangeHandler = (li) => {
    var results = [];
    li.map((e) => results.push({ menuItem : { key: e.id, content: e.name }, render: () => <Tab.Pane>Content</Tab.Pane>}));
    setPanes(results);
  };

  useEffect(() => {
    dispatch(getGroupList());
  }, []);

  useEffect(() => {
    groupListChangeHandler(groupList);
  }, [groupList]);

  return (
    <div className="MyInterestsDetail" data-testid="MyInterestsDetail">
      <EditModal trigger={<Button>Edit</Button>}/>
      <Tab panes={panes} />
    </div>
  );
};

export default MyInterestsDetail;