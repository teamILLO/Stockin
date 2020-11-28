import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Segment } from 'semantic-ui-react';

import { getStockId, RenderTableItem } from './index';
import { getFs } from '../../../store/financialstats/financialstats';


const QuarterTable = (props) => {
  const dispatch = useDispatch();
  const { fs } = useSelector((state) => state.fs);

  React.useEffect(() => {
    var stock_id = getStockId();
    if (stock_id !== -1) {
      dispatch(getFs(stock_id));
    }
  }, [dispatch, props.id]);

  return (
    <Segment style={{ overflowX: 'scroll' }} data-testid="QuarterTable">
      <Table attached="bottom">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            {fs.map((e) => RenderTableItem(e).quarter)}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>매출액</Table.Cell>
            {fs.map((e) => RenderTableItem(e).sales)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>영업이익</Table.Cell>
            {fs.map((e) => RenderTableItem(e).operatingProfit)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>당기순이익</Table.Cell>
            {fs.map((e) => RenderTableItem(e).netIncome)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>영업이익률</Table.Cell>
            {fs.map((e) => RenderTableItem(e).operatingMargin)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>순이익률</Table.Cell>
            {fs.map((e) => RenderTableItem(e).netProfitMargin)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>PER</Table.Cell>
            {fs.map((e) => RenderTableItem(e).PER)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>PBR</Table.Cell>
            {fs.map((e) => RenderTableItem(e).PBR)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>ROE</Table.Cell>
            {fs.map((e) => RenderTableItem(e).ROE)}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};
export default QuarterTable;
