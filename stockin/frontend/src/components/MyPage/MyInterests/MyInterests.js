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
        let labels = [];
        let datasets = [];
        for (let i = 0; i < e.stocks.length; i += 1) {
          labels.push(e.stocks[i].title);
          console.log(e.stocks[i]);
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
    setPanes(results);
  }, [groupList]);

  return (
    <div className="MyInterests" data-testid="MyInterests">
      <Tab panes={panes} />
    </div>
  );
};

export default MyInterests;
