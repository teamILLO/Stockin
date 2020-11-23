import React from 'react';
import { Table } from 'semantic-ui-react';


const RenderTableItem = (stock) => 
  <Table.Row key={stock.id}>
    <Table.Cell >{stock.title}</Table.Cell>
    <Table.Cell >{stock.price ? stock.price : '-'}</Table.Cell>
    <Table.Cell >{stock.highestPrice ? stock.highestPrice : '-'}</Table.Cell>
    <Table.Cell >{stock.lowestPrice ? stock.lowestPrice : '-'}</Table.Cell>
    <Table.Cell >{stock.tradeVolume ? stock.tradeVolume : '-'}</Table.Cell>
    <Table.Cell >{stock.tradeValue ? stock.tradeValue : '-'}</Table.Cell>
    <Table.Cell >{stock.startPrice ? stock.startPrice : '-'}</Table.Cell>
    <Table.Cell >{stock.yesterdayPrice ? stock.yesterdayPrice : '-'}</Table.Cell>
    <Table.Cell >{stock.amount ? stock.amount : '-'}</Table.Cell>
    <Table.Cell >{stock.isKOSPI ? 'O' : 'X'}</Table.Cell>
  </Table.Row>

const GroupStock = (props) => {
  return (
    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>title</Table.HeaderCell>
        <Table.HeaderCell>price</Table.HeaderCell>
        <Table.HeaderCell>highest price</Table.HeaderCell>
        <Table.HeaderCell>lowest price</Table.HeaderCell>
        <Table.HeaderCell>trade volume</Table.HeaderCell>
        <Table.HeaderCell>trade value</Table.HeaderCell>
        <Table.HeaderCell>start price</Table.HeaderCell>
        <Table.HeaderCell>yesterday price</Table.HeaderCell>
        <Table.HeaderCell>amount</Table.HeaderCell>
        <Table.HeaderCell>is KOSPI</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.stocks.map((stock) => RenderTableItem(stock))}
    </Table.Body>
  </Table>
  );
};

export default GroupStock;
