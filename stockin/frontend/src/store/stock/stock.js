import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/index';


const slice = createSlice({
  name: 'stock',
  initialState: {
    stockList: [],
    up : { stockinfo : [], news : [], stockhistory : []},
    down : { stockinfo : [], news : [], stockhistory : []},
  },
  reducers: {
    updateStockList: (state, action) => {
      return {
        ...state,
        stockList: action.payload,
      };
    },
    updateUpStockInfo: (state, action) => {
      return {
        ...state,
        up : {...state.up, stockinfo : action.payload},
      }
    },
    updateUpNews: (state, action) => {
      return {
        ...state,
        up : {...state.up, news : action.payload},
      }
    },
    updateUpStockHistory: (state, action) => {
      return {
        ...state,
        up : {...state.up, stockhistory : action.payload},
      }
    },
    updateDownStockInfo: (state, action) => {
      return {
        ...state,
        down : {...state.down, stockinfo : action.payload},
      }
    },
    updateDownNews: (state, action) => {
      return {
        ...state,
        down : {...state.down, news : action.payload},
      }
    },
    updateDownStockHistory: (state, action) => {
      return {
        ...state,
        down : {...state.down, stockhistory : action.payload},
      }
    },
  },
});

export default slice.reducer;

// Actions
export const { updateStockList, updateUpStockInfo, updateUpNews, updateUpStockHistory, updateDownStockInfo, updateDownNews, updateDownStockHistory } = slice.actions;

export const getStocks = () => async (dispatch) => {
  try {
    await api.get('/stocks/').then((response) => {
      dispatch(updateStockList(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};

export const getUpStockInfo = () => async (dispatch) => {
  try {
    await api.get('/stocks/report/up/stockinfo/').then((response) => {
      dispatch(updateUpStockInfo(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};

export const getUpNews = () => async (dispatch) => {
  try {
    await api.get('/stocks/report/up/news/').then((response) => {
      dispatch(updateUpNews(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};

export const getUpStockHistory = () => async (dispatch) => {
  try {
    await api.get('/stocks/report/up/stockhistory/').then((response) => {
      dispatch(updateUpStockHistory(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};

export const getDownStockInfo = () => async (dispatch) => {
  try {
    await api.get('/stocks/report/down/stockinfo/').then((response) => {
      dispatch(updateDownStockInfo(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};

export const getDownNews = () => async (dispatch) => {
  try {
    await api.get('/stocks/report/down/news/').then((response) => {
      dispatch(updateDownNews(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};

export const getDownStockHistory = () => async (dispatch) => {
  try {
    await api.get('/stocks/report/down/stockhistory/').then((response) => {
      dispatch(updateDownStockHistory(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};