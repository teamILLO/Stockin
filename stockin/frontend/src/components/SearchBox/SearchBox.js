import React, { useEffect } from 'react';
import { Search } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { getStocks } from '../../store/stock/stock';
import { history } from '../../store/store';

const initialState = {
  loading: false,
  results: [],
  value: '',
};

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return {...initialState, results: (JSON.parse(localStorage.getItem('recent-search')) || []).slice(0,5) };
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query };
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results };
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection };
    default:
      return;
  }
}

const SearchBox = () => {
  const _dispatch = useDispatch();
  const { stockList } = useSelector((state) => state.stock);
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;
  const timeoutRef = React.useRef();

  useEffect(() => {
    state.results = (JSON.parse(localStorage.getItem('recent-search')) || []).slice(0,5);
    _dispatch(getStocks());
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [_dispatch]);

  const handleSearchChange = React.useCallback(
    (e, data) => {
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
    var selected_stock = data.result;
    var retrieve_list = JSON.parse(localStorage.getItem('recent-search')) || [];

    if (
      retrieve_list.length === 0 ||
      !retrieve_list.find((element) => element.id === selected_stock.id)
    ) {
      selected_stock = { ...selected_stock, key: 'recent-serach_' + selected_stock.id, description: '최근 검색' };
      retrieve_list.unshift(selected_stock);
      localStorage.setItem('recent-search', JSON.stringify(retrieve_list.slice(0,5)));
    }

    dispatch({ type: 'UPDATE_SELECTION', selection: selected_stock.title });
    history.push('/detail/' + data.result.id);
  };

  return (
    <Search
      data-testid="SearchBox"
      // action
      fluid
      minCharacters={0}
      loading={loading}
      onSearchChange={handleSearchChange}
      onResultSelect={handleResultSelect}
      results={results}
      value={value}
    />
  );
};

export default SearchBox;
