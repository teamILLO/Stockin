import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/index';


const slice = createSlice({
  name: 'stock',
  initialState: {
    stockList: [],
    scrollData : [],
  },
  reducers: {
    updateStockList: (state, action) => {
      return {
        ...state,
        stockList: action.payload,
      };
    },
    updateScrollData: (state, action) => {
      return {
        ...state,
        scrollData : state.scrollData.concat(action.payload),
      }
    },
  },
});

export default slice.reducer;

// Actions
export const { updateStockList, updateScrollData, clearScrollData } = slice.actions;

export const getStocks = () => async (dispatch) => {
  try {
    await api.get('http://localhost:8000/api/stocks/').then((response) => {
      dispatch(updateStockList(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};

export const getScrollData = (n) => async (dispatch) => {
  try {
    await api.get('stocks/scrolldata/' + n + '/').then((response) => {
      dispatch(updateScrollData(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};


