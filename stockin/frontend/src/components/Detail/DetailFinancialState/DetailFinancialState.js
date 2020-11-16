import React from 'react';
import { Tab } from 'semantic-ui-react';

import YearTable from './YearTable';
import QuarterTable from './QuarterTable';

const panes = (id) => [
  { menuItem: '연간', render: () => <YearTable id={id} /> },
  { menuItem: '분기', render: () => <QuarterTable id={id} /> },
];

const DetailFinancialState = (props) => {
  return (
    <div data-testid="DetailFinancialState">
      <Tab panes={panes(props.id)} />
    </div>
  );
};
export default DetailFinancialState;
