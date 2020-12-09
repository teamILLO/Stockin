import { createSlice } from '@reduxjs/toolkit';


const slice = createSlice({
  name: 'increment',
  initialState: {
    increment : 0
  },
  reducers: {
    UpdateIncrement: (state, action) => {
      return {
        ...state,
        increment : state.increment + 1,
      }
    },
  },
});

export default slice.reducer;

export const { UpdateIncrement } = slice.actions;

export const updateIncrement = () => async (dispatch) => {
    await dispatch(UpdateIncrement());
};