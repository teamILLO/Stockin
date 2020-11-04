import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api/index';

const slice = createSlice({
  name: 'authentication',
  initialState: {
    loggingIn: false,
    userEmail: '',
  },
  reducers: {
    login: (state, action) => {
      state.userEmail = action.payload.email;
      state.userNickname = action.payload.nickname;
      state.loggingIn = true;
    },
  },
});

export default slice.reducer;

// Actions

const { login } = slice.actions;
export const tryLogin = (user) => async (dispatch) => {
  try {
    await api.post('/users/signin/', user).then((response) => dispatch(login(response.data)));
  } catch (e) {
    return console.error(e.message);
  }
};
