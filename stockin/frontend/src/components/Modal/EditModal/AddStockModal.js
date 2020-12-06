import React, { useEffect, useState } from 'react';
import { Search, Modal, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { getStocks } from '../../../store/stock/stock';
import { postStock } from '../../../store/groups/groups';

const initialState = {
  loading: false,
  results: [],
  value: '',
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
      return { ...state, value: action.selection};
    default:
      return;
  }
}

const AddStockModal = (props) => {
  const _dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const { stockList } = useSelector((state) => state.stock);
  const { groupList } = useSelector((state) => state.groups);
  const [state, dispatch] = React.useReducer(addStockReducer, initialState);
  const { loading, results, value } = state;
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
            key: _search_result[i].id,
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
    let is_dup = false;

    groupList.forEach((e) => {
        if(e.id === props.group_id) {
            e.stocks.forEach((stock) => {
                if(stock.id === data.result.id) {
                    is_dup = true;
                    setIsDuplicated(true);
                }
            });
        }
    });
    dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title, id : data.result.id });
    
    if(!is_dup) {
        _dispatch(postStock(props.group_id, {'id' : data.result.id}));
        dispatch({ type: 'CLEAN_QUERY' });
        setIsDuplicated(false);
        setOpen(false);
    }
  };

  const onClickCancelHandler = () => {
    dispatch({ type: 'CLEAN_QUERY' });
    setIsDuplicated(false);
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
            {isDuplicated ? <label>같은 종목이 이미 존재합니다.</label> : ""}
        </Modal.Content>
        <Modal.Actions>
            <Button 
            color='black' 
            content="취소" 
            onClick={() => onClickCancelHandler()} 
            />
        </Modal.Actions>
    </Modal>
  );
};

export default AddStockModal;
