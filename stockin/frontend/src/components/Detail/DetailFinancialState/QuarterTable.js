import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Label, Segment } from 'semantic-ui-react';

import { getFs } from '../../../store/financialstats/financialstats';

/*
  Parsing url & get stock ID 
  Return value : -1 : invalid url      
*/
function getStockId() {
  var a = window.location.pathname.substr(1).split('/');
  var b = -1;
  for (var i = 0; i < a.length; i++) {
    if (a[i] === 'detail') {
      b = a[i + 1];
      break;
    }
  }
  return b;
}

/*
  List items rendering
*/
const RenderTableItem = (item) => {
  var response = {};

  /* Header */
  const quarter = <Table.HeaderCell key={item.id}>{item.quarter}</Table.HeaderCell>;

  /* Body */
  const sales = <Table.Cell key={item.id}>{item.sales}</Table.Cell>;
  const operatingProfit = <Table.Cell key={item.id}>{item.operatingProfit}</Table.Cell>;
  const netIncome = <Table.Cell key={item.id}>{item.netIncome}</Table.Cell>;
  const operatingMargin = <Table.Cell key={item.id}>{item.operatingMargin}</Table.Cell>;
  const netProfitMargin = <Table.Cell key={item.id}>{item.netProfitMargin}</Table.Cell>;
  const PER = <Table.Cell key={item.id}>{item.PER}</Table.Cell>;
  const PBR = <Table.Cell key={item.id}>{item.PBR}</Table.Cell>;
  const ROE = <Table.Cell key={item.id}>{item.ROE}</Table.Cell>;

  response = {
    ...response,
    quarter: quarter,
    sales: sales,
    operatingProfit: operatingProfit,
    netIncome: netIncome,
    operatingMargin: operatingMargin,
    netProfitMargin: netProfitMargin,
    PER: PER,
    PBR: PBR,
    ROE: ROE,
  };
  return response;
};

const QuarterTable = () => {
  const dispatch = useDispatch();
  const { fs } = useSelector((state) => state.fs);

  React.useEffect(() => {
    var stock_id = getStockId();
    // console.log(stock_id);
    if (stock_id != -1) {
      dispatch(getFs(stock_id));
    }
  }, []);

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
