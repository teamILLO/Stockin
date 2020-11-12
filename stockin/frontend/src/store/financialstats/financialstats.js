import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/index';

const slice = createSlice({
  name: 'fs',
  initialState: {
    fs: [],
  },
  reducers: {
    getfs: (state, action) => {
      return { ...state, fs: action.payload.reverse() };
    },
  },
});

export default slice.reducer;

// Actions

export const { getfs } = slice.actions;

export const getFs = (id) => async (dispatch) => {
  try {
    await api
      .get('/stocks/financialstats/stock/' + id + '/')
      .then((response) => dispatch(getfs(response.data)));
  } catch (e) {
    return console.error(e.message);
  }
};
