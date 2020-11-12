import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/index';
import axios from 'axios';

const slice = createSlice({
  name: 'stock',
  initialState: {
    stockList: [],
  },
  reducers: {
    updateStockList: (state, action) => {
      return {
        ...state,
        stockList: action.payload,
      };
    },
  },
});

export default slice.reducer;

// Actions
export const { updateStockList } = slice.actions;
export const getStocks = () => async (dispatch) => {
  try {
    await api.get('http://localhost:8000/api/stocks/').then((response) => {
      dispatch(updateStockList(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};
