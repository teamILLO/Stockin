import React, { useEffect, useState } from 'react';
import { Search, Modal, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { getStocks } from '../../../store/stock/stock';
import { postStock } from '../../../store/groups/groups';

const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9);

const initialState = {
  loading: false,
  results: [],
  value: '',
  selected_stock_id : '',
};

function addStockReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState;
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query };
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results };
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection, selected_stock_id : action.id };
    default:
      return;
  }
}

const AddStockModal = (props) => {
  const _dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { stockList } = useSelector((state) => state.stock);
  const [state, dispatch] = React.useReducer(addStockReducer, initialState);
  const { loading, results, value, selected_stock_id } = state;
  const timeoutRef = React.useRef();
 
  useEffect(() => {
    _dispatch(getStocks());
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [_dispatch]);

  const handleSearchChange = React.useCallback((e, data) => {
      clearTimeout(timeoutRef.current);
      dispatch({ type: 'DEFAULT' });
      dispatch({ type: 'START_SEARCH', query: data.value });

      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: 'CLEAN_QUERY' });
          return;
        }
        var search_result = [];
        var _search_result = stockList
          .filter((st) => st.title.toUpperCase().includes(data.value.toUpperCase()))
          .slice(0, 5);

        var i;
        for (i = 0; i < _search_result.length; i++) {
          var temp = {
            ..._search_result[i],
            key: keyGenerator(),
            description: _search_result[i].sector,
          };
          search_result.push(temp);
        }
        dispatch({ type: 'FINISH_SEARCH', results: search_result });
      }, 300);
    },
    [stockList],
  );

  const handleResultSelect = (e, data) => {
    var selected_stock = data.result;
    dispatch({ type: 'UPDATE_SELECTION', selection: selected_stock.title, id : selected_stock.id });
  };

  const onClickConfirmHandler = () => {
    console.log(selected_stock_id);
    if(selected_stock_id != 0) {
        _dispatch(postStock(props.group_id, {'id' : selected_stock_id}));
    }
    setOpen(false);
  };

  return (
    <Modal
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.trigger}
    >
        <Modal.Header>종목 추가</Modal.Header>
        <Modal.Content>
            <Search
                fluid
                loading={loading}
                onSearchChange={handleSearchChange}
                onResultSelect={handleResultSelect}
                results={results}
                value={value}
            />
        </Modal.Content>
        <Modal.Actions>
            <Button 
            color='black' 
            content="취소" 
            onClick={() => setOpen(false)} 
            />
            <Button
            content="확인"
            labelPosition='right'
            icon='checkmark'
            onClick={() => onClickConfirmHandler()}
            positive
            />
        </Modal.Actions>
    </Modal>
  );
};

export default AddStockModal;
