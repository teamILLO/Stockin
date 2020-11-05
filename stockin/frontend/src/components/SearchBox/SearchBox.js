import _ from 'lodash';
import React from 'react';
import stocks from './stocks';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react';
import { useHistory } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { getStocks } from '../../store/stock';

const initialState = {
  loading: false,
  results: [],
  value: '',
  stocks: [],
};

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState;
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query };
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results };
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

const resultRenderer = ({ title }) => <p>{title}</p>;

function SearchBox() {
  const history = useHistory(); 
  const _dispatch = useDispatch();
  const { stockList } = useSelector((state) => state.stock);
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();

  React.useEffect(() => {
    _dispatch(getStocks());
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSearchChange = React.useCallback((e, data) => {
    console.log(data)
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });


    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }
      dispatch({
        type: 'FINISH_SEARCH',
        results: stockList.filter((st) => st.title.toUpperCase().includes(data.value.toUpperCase())),
      });
    }, 300);
  }, [stockList]);

  const handleResultSelect = (e, data) => {
    dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title });
    console.log(data.result.id)
    history.push('/detail/' + data.result.id)

  }
  return (
    <Search
      data-testid="SearchBox"
      fluid
      action
      loading={loading}
      onSearchChange={handleSearchChange}
      onResultSelect={handleResultSelect}
      resultRenderer={resultRenderer}
      results={results}
      value={value}
    />
  );
}

export default SearchBox;
