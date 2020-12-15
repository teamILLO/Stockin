import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { getGroupList } from '../../../store/groups/groups';
import { RenderMyInterestsDetailItem } from '../index';
import '../../../styles/buttons.css';

const MyInterestsDetail = () => {
  const dispatch = useDispatch();
  const { groupList } = useSelector((state) => state.groups);
  const [panes, setPanes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(getGroupList());
  }, []);

  useEffect(() => {
    let results = RenderMyInterestsDetailItem(groupList);
    setPanes(results);
  }, [groupList]);

  const handleTabChange = (e, { activeIndex }) => {
    if (activeIndex === panes.length - 1) setActiveIndex(0);
    else setActiveIndex(activeIndex);
  };

  return (
    <div className="MyInterestsDetail" data-testid="MyInterestsDetail">
      <Tab
        menu={{ attached: true, tabular: true, className: 'withButton' }}
        panes={panes}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default MyInterestsDetail;
