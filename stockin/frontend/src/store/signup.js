import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api/index';

const slice = createSlice({
  name: 'signup',
  initialState,
  reducers,
});

export default slice.reducer;

// Actions

export const signup = (user) => async (dispatch) => {
  try {
    await api.post('/users/signin', user).then((response) => dispatch(login(response.data)));
  } catch (e) {
    return console.error(e.message);
  }
};
