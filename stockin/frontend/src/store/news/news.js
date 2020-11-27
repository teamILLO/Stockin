import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/index';

const slice = createSlice({
  name: 'news',
  initialState: {
    news: [],
  },
  reducers: {
    getnews: (state, action) => {
      return { ...state, news: action.payload };
    },
  },
});

export default slice.reducer;

// Actions

export const { getnews } = slice.actions;
export const getNews = (id, date) => async (dispatch) => {
  try {
    await api
      .get('/news/stocks/' + id + '/date/' + date + '/')
      .then((response) => dispatch(getnews(response.data)));
  } catch (e) {
    return console.error(e.message);
  }
};
