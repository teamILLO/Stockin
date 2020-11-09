import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api/index';
import { timeParse } from 'd3-time-format';

const slice = createSlice({
  name: 'stockHistory',
  initialState: {
    priceList: [],
  },
  reducers: {
    stockHistory: (state, action) => {
      let data = action.payload;
      let parseDate = timeParse('%Y-%m-%dT%H:%M:%SZ');
      data.forEach((d, i) => {
        d.date = parseDate(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
      });
      state.priceList = data;
    },
  },
});

export default slice.reducer;

// Actions

const { stockHistory } = slice.actions;

export const getStockHistory = (stock_id) => async (dispatch) => {
  try {
    await api
      .get('/stocks/price/' + stock_id + '/', user)
      .then((response) => dispatch(stockHistory(response.data)));
  } catch (e) {
    return console.error(e.message);
  }
};
