import React from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';
import { history } from '../../../store/store';

function sortReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.reverse(),
          direction: state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      };
    default:
      throw new Error();
  }
}

const RenderTableItem = (stock) => (
  <Table.Row key={stock.id}>
    <Table.Cell onClick={() => history.push('/detail/' + stock.id)}>{stock.title}</Table.Cell>
    <Table.Cell>
      {stock.price ? stock.price.toLocaleString('en-US', { minimumFractionDigits: 0 }) : '-'}
    </Table.Cell>
    <Table.Cell>
      {stock.highestPrice
        ? stock.highestPrice.toLocaleString('en-US', { minimumFractionDigits: 0 })
        : '-'}
    </Table.Cell>
    <Table.Cell>
      {stock.lowestPrice
        ? stock.lowestPrice.toLocaleString('en-US', { minimumFractionDigits: 0 })
        : '-'}
    </Table.Cell>
    <Table.Cell>
      {stock.tradeVolume
        ? stock.tradeVolume.toLocaleString('en-US', { minimumFractionDigits: 0 })
        : '-'}
    </Table.Cell>
    <Table.Cell>
      {stock.tradeValue
        ? stock.tradeValue.toLocaleString('en-US', { minimumFractionDigits: 0 })
        : '-'}
    </Table.Cell>
  </Table.Row>
);

const GroupStock = (props) => {
  const [state, dispatch] = React.useReducer(sortReducer, {
    column: null,
    data: props.stocks,
    direction: null,
  });
  const { column, data, direction } = state;
  return (
    <Table sortable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'title' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'title' })}
            data-testid="title"
          >
            종목명
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'price' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'price' })}
            data-testid="price"
          >
            현재가(원)
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'highestPrice' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'highestPrice' })}
            data-testid="highestPrice"
          >
            최고가(원)
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'lowestPrice' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'lowestPrice' })}
            data-testid="lowestPrice"
          >
            최저가(원)
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'tradeVolume' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'tradeVolume' })}
            data-testid="tradeVolume"
          >
            총거래량
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'tradeValue' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'tradeValue' })}
            data-testid="tradeValue"
          >
            총거래가격(원)
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{data.map((stock) => RenderTableItem(stock))}</Table.Body>
    </Table>
  );
};

export default GroupStock;
