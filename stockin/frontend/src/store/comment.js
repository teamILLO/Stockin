import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api/index';

const initialState = {
  commentList: [],
};

const slice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    saveCommentList: (state, action) => {
      state.commentList = action.payload;
    },
  },
});

export default slice.reducer;

// Actions

const { saveCommentList } = slice.actions;
export const updateCommentList = (stock_id) => async (dispatch) => {
  try {
    await api
      .get('/stocks/' + stock_id + '/comments/')
      .then((response) => dispatch(saveCommentList(response.data)));
  } catch (e) {
    return console.error(e.message);
  }
};
export const commentList = state.comment.commentList;
