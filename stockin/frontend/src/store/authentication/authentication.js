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
      console.log(state);
    },
    logout: (state, action) => {
      state.userid = 0;
      state.loggingIn = false;
      console.log(state);
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
      console.log(response);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    });
  } catch (e) {
    return console.error(e.message);
  }
};

export const tryLogout = () => async (dispatch) => {
  try {
    await api.get('/users/signout/').then((response) => {
      dispatch(logout());
      console.log(response);
      localStorage.removeItem('userInfo');
    });
  } catch (e) {
    return console.error(e.message);
  }
};
