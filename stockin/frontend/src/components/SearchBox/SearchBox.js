import _ from 'lodash';
import React from 'react';
import stocks from './stocks';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react';
import { useHistory } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { getStocks } from '../../store/stock';

const initialState = {
  loading: false,
  results: JSON.parse(localStorage.getItem('recent-search')) || [],
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
      return { ...state, loading: false, results: state.results.concat(action.results) };
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

const resultRenderer = ({ title }) => <p>{title}</p>;

const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9);

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
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }

      var search_result = [];
      var _search_result = stockList.filter((st) => st.title.toUpperCase().includes(data.value.toUpperCase())).slice(0,5);
      var i;
      for(i = 0; i < _search_result.length; i++) {
        var temp = {..._search_result[i], key : keyGenerator()};
        search_result.push(temp);
      }

      console.log(search_result);

      dispatch({type: 'FINISH_SEARCH', results: search_result});
    }, 300);
  }, [stockList]);

  const handleResultSelect = (e, data) => {
    const selected_stock = data.result;
    var retrieve_list = JSON.parse(localStorage.getItem('recent-search')) || [];
    console.log(retrieve_list);
    
    if(retrieve_list.length === 0
       || !retrieve_list.find(element => element.id === selected_stock.id)) {
      selected_stock.key = keyGenerator();
      console.log(selected_stock);
      retrieve_list.push(selected_stock);
      localStorage.setItem('recent-search', JSON.stringify(retrieve_list));
    }
    
    dispatch({ type: 'UPDATE_SELECTION', selection: selected_stock.title });
    //history.push('/detail/' + data.result.id)

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
