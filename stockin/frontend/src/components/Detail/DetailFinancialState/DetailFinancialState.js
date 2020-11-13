import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import YearTable from './YearTable';
import QuarterTable from './QuarterTable';

const panes = [
  { menuItem: '연간', render: () => <YearTable /> },
  { menuItem: '분기', render: () => <QuarterTable /> },
];

const DetailFinancialState = () => {
  return (
    <div data-testid="DetailFinancialState">
      <Tab panes={panes} />
    </div>
  );
};
export default DetailFinancialState;
