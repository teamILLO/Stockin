import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Button } from 'semantic-ui-react';
import MyInterestsChart from './MyInterestsChart';
import EditModal from '../../Modal/EditModal/EditModal';
import { getGroupList } from '../../../store/groups/groups';
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
    var results = [];
    results = groupList.map((e) => ({
      menuItem: { key: e.id, content: e.name },
      render: () => {
        let labels = [];
        let datasets = [];
        for (let i = 0; i < e.stocks.length; i += 1) {
          labels.push(e.stocks[i].title);
          if (e.stocks[i].fs_score.score) {
            datasets.push({
              fill: true,
              backgroundColor: 'rgba(75,192,192,0.4)',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 3.5,
              pointHitRadius: 10,
              label: e.stocks[i].title,
              data: [
                {
                  x: e.stocks[i].fs_score.score,
                  y: e.stocks[i].score - 50,
                },
              ],
            });
          }
        }
        return (
          <Tab.Pane>
            <MyInterestsChart data={{ labels: labels, datasets: datasets }} />
          </Tab.Pane>
        );
      },
    }));
    results = [
      ...results,
      {
        menuItem: {
          content: <EditModal trigger={<Button>edit</Button>} />,
          className: 'disabled',
          key: 'editButton',
        },
      },
    ];
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
