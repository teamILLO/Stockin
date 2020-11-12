import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/index';
import { timeParse } from 'd3-time-format';

const slice = createSlice({
  name: 'stockHistory',
  initialState: {
    priceList: [],
  },
  reducers: {
    updatePriceList: (state, action) => {
      let data = action.payload;
      let parseDate = timeParse('%Y-%m-%d');
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

export const { updatePriceList } = slice.actions;

export const getStockHistory = (stock_id) => async (dispatch) => {
  try {
    await api
      .get('/stocks/price/' + stock_id + '/')
      .then((response) => dispatch(updatePriceList(response.data)));
  } catch (e) {
    return console.error(e.message);
  }
};