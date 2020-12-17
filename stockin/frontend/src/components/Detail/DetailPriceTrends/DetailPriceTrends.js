import React from 'react';
import { Table, Image } from 'semantic-ui-react';
import dash from '../../../images/icons/dash.png';
import increase from '../../../images/icons/increase.png';
import decrease from '../../../images/icons/decrease.png';

const DetailPriceTrends = (props) => {
  const { data } = props;
  const ROW_LENGTH = 50;
  const rowLength = data.length > ROW_LENGTH ? ROW_LENGTH : data.length;
  const reversedData = data.slice().reverse();

  const changeCalculator = (curr, prev) => {
    if (prev === 0) return { img: '', output: 'N/A' };
    else if (prev === curr) return { img: dash, output: '0' };
    else if (prev > curr)
      return { img: decrease, output: `${((1 - curr / prev) * 100).toFixed(2)}%` };
    else return { img: increase, output: `${((curr / prev - 1) * 100).toFixed(2)}%` };
  };

  const monthGetter = (date) => {
    return date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  };

  const dayGetter = (date) => {
    return date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  };
  const rows = reversedData.slice(0, rowLength).map((dat, i) => {
    if (data.length <= ROW_LENGTH && i + 1 === rowLength)
      return (
        <Table.Row key={i}>
          <Table.Cell>{monthGetter(dat.date) + '.' + dayGetter(dat.date)}</Table.Cell>
          <Table.Cell>{dat.close}</Table.Cell>
          <Table.Cell>{'N/A'}</Table.Cell>
          <Table.Cell>{'N/A'}</Table.Cell>
        </Table.Row>
      );
    else
      return (
        <Table.Row key={i}>
          <Table.Cell>{monthGetter(dat.date) + '.' + dayGetter(dat.date)}</Table.Cell>
          <Table.Cell>{dat.close}</Table.Cell>
          <Table.Cell>{dat.close - reversedData[i + 1].close}</Table.Cell>
          <Table.Cell verticalAlign="middle">
            <Image as="i" src={changeCalculator(dat.close, reversedData[i + 1].close).img} />
            <span>{' ' + changeCalculator(dat.close, reversedData[i + 1].close).output}</span>
          </Table.Cell>
        </Table.Row>
      );
  });
  return (
    <div data-testid="DetailPriceTrends">
      <Table basic="very" celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Ending Price</Table.HeaderCell>
            <Table.HeaderCell>Difference</Table.HeaderCell>
            <Table.HeaderCell>Fluctuation Rate</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{rows}</Table.Body>
      </Table>
    </div>
  );
};

export default DetailPriceTrends;
