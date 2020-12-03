import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Segment, Menu } from 'semantic-ui-react';

import { getStockId, RenderTableItem } from './index';
import { getFs } from '../../../store/financialstats/financialstats';


const QuarterTable = (props) => {
  const [activeItem, setActiveItem] = useState('2020');
  const dispatch = useDispatch();
  const { fs } = useSelector((state) => state.fs);
  const [target_fs, setTargetFS] = useState([]);

  /**
   * for pagnation
   */
  const RenderMenuItem = (start_year, end_year) => {
    let response = [];

    for(let i = start_year; i <= end_year; i++) {
      response.push(
        <Menu.Item
          key={i+''}
          name={i+''}
          active={activeItem === (i+'')}
          onClick={() => setActiveItem(i+'')}
        />
      );
    }
    return response;
  };

  React.useEffect(() => {
    var stock_id = getStockId();
    if (stock_id !== -1) {
      dispatch(getFs(stock_id));
    }
  }, [dispatch, props.id]);

  React.useEffect(() => {
    let temp_fs = [];

    fs.forEach((e) => {
      if (e.quarter.includes(activeItem.slice(2,4) + '년')) {
        temp_fs.push(e);
      }
    });
    setTargetFS(temp_fs);
  }, [fs, activeItem]);

  return (
    <Segment style={{ overflowX: 'scroll' }} data-testid="QuarterTable">
      <Table attached="bottom">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            {target_fs.map((e) => RenderTableItem(e).quarter)}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>매출액(억원)</Table.Cell>
            {target_fs.map((e) => RenderTableItem(e).sales)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>영업이익(억원)</Table.Cell>
            {target_fs.map((e) => RenderTableItem(e).operatingProfit)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>당기순이익(억원)</Table.Cell>
            {target_fs.map((e) => RenderTableItem(e).netIncome)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>영업이익률(%)</Table.Cell>
            {target_fs.map((e) => RenderTableItem(e).operatingMargin)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>순이익률(%)</Table.Cell>
            {target_fs.map((e) => RenderTableItem(e).netProfitMargin)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>PER</Table.Cell>
            {target_fs.map((e) => RenderTableItem(e).PER)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>PBR</Table.Cell>
            {target_fs.map((e) => RenderTableItem(e).PBR)}
          </Table.Row>
          <Table.Row>
            <Table.Cell>ROE</Table.Cell>
            {target_fs.map((e) => RenderTableItem(e).ROE)}
          </Table.Row>
        </Table.Body>
      </Table>
      <Menu pagination>
        {RenderMenuItem(2015, 2020)}
      </Menu>
    </Segment>
  );
};
export default QuarterTable;
