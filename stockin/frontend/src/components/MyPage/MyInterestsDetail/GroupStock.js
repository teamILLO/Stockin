import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import EditModal from '../../Modal/EditModal/EditModal';


const RenderTableItem = (stock) => 
  <Table.Row key={stock.id}>
    <Table.Cell >{stock.title}</Table.Cell>
    <Table.Cell >{stock.price ? stock.price : '-'}</Table.Cell>
    <Table.Cell >{stock.highestPrice ? stock.highestPrice : '-'}</Table.Cell>
    <Table.Cell >{stock.lowestPrice ? stock.lowestPrice : '-'}</Table.Cell>
    <Table.Cell >{stock.tradeVolume ? stock.tradeVolume : '-'}</Table.Cell>
    <Table.Cell >{stock.tradeValue ? stock.tradeValue : '-'}</Table.Cell>
  </Table.Row>

const GroupStock = (props) => {
  return (
    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>종목명</Table.HeaderCell>
        <Table.HeaderCell>현재가</Table.HeaderCell>
        <Table.HeaderCell>최고가</Table.HeaderCell>
        <Table.HeaderCell>최저가</Table.HeaderCell>
        <Table.HeaderCell>총거래량</Table.HeaderCell>
        <Table.HeaderCell>총거래가격</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.stocks.map((stock) => RenderTableItem(stock))}
    </Table.Body>
  </Table>
  );
};

export default GroupStock;
