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
    editCommentList: (state, action) => {
      let editedComment = action.payload;
      state.commentList
        .filter((comment) => comment.id === editedComment.id)
        .map((comment) => (comment.content = editedComment.content));
    },
  },
});

export default slice.reducer;

// Actions

const { saveCommentList } = slice.actions;
const { editCommentList } = slice.actions;
export const getCommentList = (stock_id) => async (dispatch) => {
  try {
    await api
      .get('/stocks/' + stock_id + '/comments/')
      .then((response) => dispatch(saveCommentList(response.data)));
  } catch (e) {
    return console.error(e.message);
  }
};
export const editComment = (comment_id, content) => async (dispatch) => {
  try {
    await api
      .put('/comments/' + comment_id + '/', { content: content })
      .then((response) => dispatch(editCommentList({ ...response.data, id: comment_id })));
  } catch (e) {
    return console.error(e.message);
  }
};
