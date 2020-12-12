import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Button } from 'semantic-ui-react';
import MyInterestsChart from './MyInterestsChart';
import EditModal from '../../Modal/EditModal/EditModal';
import { getGroupList } from '../../../store/groups/groups';
import { RenderMyInterestsItem } from '../index';
import '../../../styles/buttons.css';

const MyInterests = (props) => {
  const dispatch = useDispatch();
  const { groupList } = useSelector((state) => state.groups);
  const [panes, setPanes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(getGroupList());
  }, [dispatch]);

  useEffect(() => {
    let results = [];
    results = RenderMyInterestsItem(groupList);
    setPanes(results);
  }, [groupList]);

  const handleTabChange = (e, { activeIndex }) => {
    if (activeIndex === panes.length - 1) setActiveIndex(0);
    else setActiveIndex(activeIndex);
  };

  return (
    <div className="MyInterests" data-testid="MyInterests">
      <Tab
        menu={{ attached: true, tabular: true, className: 'withButton' }}
        panes={panes}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default MyInterests;
