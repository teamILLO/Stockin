import React from 'react';
import { Tab, Button } from 'semantic-ui-react';
import MyInterestsChart from './MyInterests/MyInterestsChart';
import EditModal from '../Modal/EditModal/EditModal';
import GroupStock from './MyInterestsDetail/GroupStock';

export const RenderMyInterestsItem = (groupList) => {
    let results = [];
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

    return results;
};


export const RenderMyInterestsDetailItem = (groupList) => {
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
    return results;
};