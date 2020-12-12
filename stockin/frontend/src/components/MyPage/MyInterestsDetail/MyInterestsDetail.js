import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Button } from 'semantic-ui-react';
import EditModal from '../../Modal/EditModal/EditModal';
import { getGroupList } from '../../../store/groups/groups';
import GroupStock from './GroupStock';
import '../../../styles/buttons.css';

const MyInterestsDetail = () => {
  const dispatch = useDispatch();
  const { groupList } = useSelector((state) => state.groups);
  const [panes, setPanes] = useState([]);
 // const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(getGroupList());
  }, []);

  useEffect(() => {
    var results = [];
    results = groupList.map((e) => ({
      menuItem: { key: e.id, content: e.name },
      render: () => (
        <Tab.Pane>
          <GroupStock stocks={e.stocks} />
        </Tab.Pane>
      ),
    }));
    results = [
      ...results,
      {
        menuItem: {
          content: <EditModal trigger={<Button>edit group</Button>} />,
          className: 'disabled',
          key: 'editButton',
        },
        render: () => (
          <h5>
            <br />
            <br />
            <br />
            PLEASE ADD GROUP!
            <br />
            <br />
            <br />
          </h5>
        ),
      },
    ];
    setPanes(results);
  }, [groupList]);

  // const handleTabChange = (e, { activeIndex }) => {
  //   if (activeIndex === panes.length - 1) setActiveIndex(0);
  //   else setActiveIndex(activeIndex);
  // };

  return (
    <div className="MyInterestsDetail" data-testid="MyInterestsDetail">
      <Tab
        menu={{ attached: true, tabular: true, className: 'withButton' }}
        panes={panes}
        // activeIndex={activeIndex}
        // onTabChange={handleTabChange}
      />
    </div>
  );
};

export default MyInterestsDetail;
