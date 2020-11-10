import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api/index';

const slice = createSlice({
  name: 'stock',
  initialState: {
    stockList : [],
  },
  reducers: {
    stocklist: (state, action) => {
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
    await api.get('/stocks/').then((response) => {
      dispatch(stocklist(response.data));
    })
  } catch (e) {
    return console.error(e.message);
  }
};


