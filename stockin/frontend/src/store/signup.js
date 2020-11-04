import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api/index';

const slice = createSlice({
  name: 'user',
  initialState: {
    userList: [],
  },
  reducers: {
    signup: (state, action) => {
      state.userList.push({
        email: action.payload.email,
        nickname: action.payload.nickname,
        password: action.payload.password,
      });
    },
  },
});

export default slice.reducer;

// Actions

const { signup } = slice.actions;

export const trySignup = (user) => async (dispatch) => {
  try {
    await api.post('/users/signup/', user).then((response) => dispatch(signup(response.data)));
  } catch (e) {
    return console.error(e.message);
  }
};
