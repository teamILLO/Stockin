import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/index';

const slice = createSlice({
  name: 'authentication',
  initialState: {
    loggingIn: false,
    userid: 0,
  },
  reducers: {
    login: (state, action) => {
      state.userid = action.payload.id;
      state.loggingIn = true;
      console.log(action.payload);
      console.log(action);
    },
  },
});

export default slice.reducer;

// Actions

const { login } = slice.actions;
export const tryLogin = (user) => async (dispatch) => {
  try {
    console.log(user);
    await api.post('/users/signin/', user).then((response) => {
      console.log(response);
      dispatch(login(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};
