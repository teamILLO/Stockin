import React from 'react';
import { Table } from 'semantic-ui-react';


const RenderTableItem = (stock) => 
  <Table.Row key={stock.id}>
    <Table.Cell >{stock.title}</Table.Cell>
    <Table.Cell >{stock.price ? stock.price.toLocaleString('en-US', {minimumFractionDigits: 0}) : '-'}</Table.Cell>
    <Table.Cell >{stock.highestPrice ? stock.highestPrice.toLocaleString('en-US', {minimumFractionDigits: 0}) : '-'}</Table.Cell>
    <Table.Cell >{stock.lowestPrice ? stock.lowestPrice.toLocaleString('en-US', {minimumFractionDigits: 0}) : '-'}</Table.Cell>
    <Table.Cell >{stock.tradeVolume ? stock.tradeVolume.toLocaleString('en-US', {minimumFractionDigits: 0}) : '-'}</Table.Cell>
    <Table.Cell >{stock.tradeValue ? stock.tradeValue.toLocaleString('en-US', {minimumFractionDigits: 0}) : '-'}</Table.Cell>
  </Table.Row>

const GroupStock = (props) => {
  return (
    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>종목명</Table.HeaderCell>
        <Table.HeaderCell>현재가(원)</Table.HeaderCell>
        <Table.HeaderCell>최고가(원)</Table.HeaderCell>
        <Table.HeaderCell>최저가(원)</Table.HeaderCell>
        <Table.HeaderCell>총거래량</Table.HeaderCell>
        <Table.HeaderCell>총거래가격(원)</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.stocks.map((stock) => RenderTableItem(stock))}
    </Table.Body>
  </Table>
  );
};

export default GroupStock;
