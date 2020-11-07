import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/index';

const slice = createSlice({
  name: 'authentication',
  initialState: {
    loggingIn: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.loggingIn = true;
    },
    logout: (state, action) => {
      state.user = null;
      state.loggingIn = false;
    },
  },
});

export default slice.reducer;

// Actions

const { login, logout } = slice.actions;

export const tryLogin = (user) => async (dispatch) => {
  try {
    await api.post('/users/signin/', user).then((response) => {
      dispatch(login(response.data));
      sessionStorage.setItem('userInfo', JSON.stringify(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};

export const tryLogout = (user) => async (dispatch) => {
  try {
    await api.post('/users/signout/', user).then((response) => {
      dispatch(logout());
      sessionStorage.removeItem('userInfo');
    });
  } catch (e) {
    return console.error(e.message);
  }
};
