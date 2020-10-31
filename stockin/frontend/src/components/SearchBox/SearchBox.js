import _ from 'lodash';
import React from 'react';
import stocks from './stocks';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react';

const initialState = {
  loading: false,
  results: [],
  value: '',
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

const resultRenderer = ({ name }) => <p>{name}</p>;

function SearchBox() {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }
      dispatch({
        type: 'FINISH_SEARCH',
        results: stocks.filter((st) => st.name.toUpperCase().includes(data.value.toUpperCase())),
      });
    }, 300);
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Search
      data-testid="SearchBox"
      fluid
      loading={loading}
      onResultSelect={(e, data) =>
        dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
      }
      onSearchChange={handleSearchChange}
      resultRenderer={resultRenderer}
      results={results}
      value={value}
    />
  );
}

export default SearchBox;
