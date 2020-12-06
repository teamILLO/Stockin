import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Button } from 'semantic-ui-react';
import EditModal from '../../Modal/EditModal/EditModal';
import { getGroupList } from '../../../store/groups/groups';
import GroupStock from './GroupStock';


const MyInterestsDetail = () => {
  const dispatch = useDispatch();
  const { groupList } = useSelector((state) => state.groups);
  const [panes, setPanes] = useState([]);

  useEffect(() => {
    dispatch(getGroupList());
  }, []);

  useEffect(() => {
    var results = [];
    results = groupList.map((e) => ({ menuItem : { key: e.id, content: e.name }, render : () => <Tab.Pane><GroupStock stocks={e.stocks} /></Tab.Pane> }));
    setPanes(results);
  }, [groupList]);

  return (
    <div className="MyInterestsDetail" data-testid="MyInterestsDetail">
      <EditModal 
        trigger={<Button>편집</Button>}
      />
      <Tab panes={panes} />
    </div>
  );
};

export default MyInterestsDetail;