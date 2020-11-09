import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api/index';
import axios from 'axios';

const slice = createSlice({
  name: 'stock',
  initialState: {
    stockList : [],
  },
  reducers: {
    stocklist: (state, action) => {
      console.log("a");
      return {
        ...state,
        stockList : action.payload,
      }
    },
  },
});

export default slice.reducer;

// Actions
const { stocklist } = slice.actions;
export const getStocks = () => async (dispatch) => {
  try {
    await axios.get('http://localhost:8000/api/stocks/').then((response) => {
      dispatch(stocklist(response.data));
    })
  } catch (e) {
    return console.error(e.message);
  }
};


