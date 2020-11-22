import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/index';

const slice = createSlice({
  name: 'groups',
  initialState: {
    group: [],
    groupList: [],
  },
  reducers: {
    postgroup: (state, action) => ({ ...state, group: action.payload.name }),
    getgrouplist: (state, action) => ({ ...state, groupList: action.payload }),
  },
});

export default slice.reducer;

// Actions
export const { postgroup, getgrouplist } = slice.actions;

export const postGroup = (name) => async (dispatch) => {
  try {
    await api.post('/groups/', name)
    .then(async (response) => {
      try {
        await api.get('/groups/')
          .then((response) => dispatch(getgrouplist(response.data)));
      } catch (e) {
        return console.error(e.message);
        }
    })
  } catch (e) {
    return console.error(e.message);
  }
};

export const deleteGroup = (group_id) => async (dispatch) => {
  try {
    await api.delete('/groups/' + group_id + '/')
      .then(async (response) => {
        try {
          await api.get('/groups/')
            .then((response) => dispatch(getgrouplist(response.data)));
        } catch (e) {
          return console.error(e.message);
      }})
  } catch (e) {
    return console.error(e.message);
  }
};

export const getGroupList = () => async (dispatch) => {
    try {
      await api.get('/groups/')
        .then((response) => dispatch(getgrouplist(response.data)));
    } catch (e) {
      return console.error(e.message);
    }
};

export const deleteGroupStock = (group_id, stock_id) => async (dispatch) => {
  try {
    await api.delete('/groups/' + group_id + '/stocks/' + stock_id + '/')
      .then(async (response) => {
        try {
          await api.get('/groups/')
            .then((response) => dispatch(getgrouplist(response.data)));
        } catch (e) {
          return console.error(e.message);
      }})
  } catch (e) {
    return console.error(e.message);
  }
};
