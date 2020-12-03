import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Segment } from 'semantic-ui-react';

import { getStockId, RenderTableItem, RenderPopUpItems } from './index';
import { getFs } from '../../../store/financialstats/financialstats';


const YearTable = (props) => {
  const dispatch = useDispatch();
  const { fs } = useSelector((state) => state.fs);
  const [year_fs, setYearFS] = useState([]);

  React.useEffect(() => {
    var stock_id = getStockId();
    if (stock_id !== -1) {
      dispatch(getFs(stock_id));
    }
  }, [dispatch, props.id]);

  React.useEffect(() => {
    var temp_fs = [];

    fs.forEach((e) => {
      if (e.quarter.includes('12월')) {
        temp_fs.push(e);
      }
    });
    setYearFS(temp_fs);
  }, [fs]);

  return (
    <Segment style={{ overflowX: 'scroll' }} data-testid="YearTable">
      <Table attached="bottom">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            {year_fs.map((e) => RenderTableItem(e).quarter)}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>매출액(억원) {RenderPopUpItems('sales')}</Table.Cell>
            {year_fs.map((e) => RenderTableItem(e).sales)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>영업이익(억원) {RenderPopUpItems('operatingProfit')}</Table.Cell>
            {year_fs.map((e) => RenderTableItem(e).operatingProfit)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>당기순이익(억원) {RenderPopUpItems('netIncome')}</Table.Cell>
            {year_fs.map((e) => RenderTableItem(e).netIncome)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>영업이익률(%) {RenderPopUpItems('operatingMargin')}</Table.Cell>
            {year_fs.map((e) => RenderTableItem(e).operatingMargin)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>순이익률(%) {RenderPopUpItems('netProfitMargin')}</Table.Cell>
            {year_fs.map((e) => RenderTableItem(e).netProfitMargin)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>PER {RenderPopUpItems('PER')}</Table.Cell>
            {year_fs.map((e) => RenderTableItem(e).PER)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>PBR {RenderPopUpItems('PBR')}</Table.Cell>
            {year_fs.map((e) => RenderTableItem(e).PBR)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>ROE {RenderPopUpItems('ROE')}</Table.Cell>
            {year_fs.map((e) => RenderTableItem(e).ROE)}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};
export default YearTable;
