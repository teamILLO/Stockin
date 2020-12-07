import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import MyInterestsChart from './MyInterestsChart';
import { getGroupList } from '../../../store/groups/groups';

const MyInterests = (props) => {
  const dispatch = useDispatch();
  const { groupList } = useSelector((state) => state.groups);
  const [panes, setPanes] = useState([]);

  useEffect(() => {
    dispatch(getGroupList());
  }, []);

  useEffect(() => {
    var results = [];
    results = groupList.map((e) => ({
      menuItem: { key: e.id, content: e.name },
      render: () => {
        console.log(e.stocks);
        return (
          <Tab.Pane>
            <MyInterestsChart data={e.stocks} />
          </Tab.Pane>
        );
      },
    }));
    setPanes(results);
  }, [groupList]);

  return (
    <div className="MyInterests" data-testid="MyInterests">
      <Tab panes={panes} />
    </div>
  );
};

export default MyInterests;
