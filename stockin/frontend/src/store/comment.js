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
      state.commentList.forEach((comment) => {
        comment =
          comment.id === editedComment.id ? (comment.content = editedComment.content) : comment;
      });
    },
    deleteCommentFromList: (state, action) => {
      state.commentList = state.commentList.filter((comment) => comment.id !== action.payload.id);
    },
    postCommentToList: (state, action) => {
      state.commentList.push(action.payload);
    },
  },
});

export default slice.reducer;

// Actions

const {
  saveCommentList,
  editCommentList,
  deleteCommentFromList,
  postCommentToList,
} = slice.actions;
export const getCommentList = (stock_id) => async (dispatch) => {
  try {
    await api.get('/stocks/' + stock_id + '/comments/').then((response) => {
      dispatch(saveCommentList(response.data));
      console.log(response.data);
    });
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
export const deleteComment = (comment_id) => async (dispatch) => {
  try {
    await api
      .delete('/comments/' + comment_id + '/')
      .then((response) => dispatch(deleteCommentFromList({ id: comment_id })));
  } catch (e) {
    return console.error(e.message);
  }
};
export const postComment = (stock_id, content) => async (dispatch) => {
  try {
    await api.post('/stocks/' + stock_id + '/comments/', { content: content }).then((response) =>
      dispatch(
        postCommentToList({
          id: response.data.id,
          stock: stock_id,
          time: response.data.time,
          content: content,
          author: response.data.nickname,
        }),
      ),
    );
  } catch (e) {
    return console.error(e.message);
  }
};
