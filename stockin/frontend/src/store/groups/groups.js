import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/index';

const slice = createSlice({
  name: 'groups',
  initialState: {
    group: [],
    groupList: [],
  },
  reducers: {
    postgroup: (state, action) => {
      return { ...state, group: action.payload.name };
    },
    getgrouplist: (state, action) => {
        return { ...state, groupList: action.payload };
      },
  },
});

export default slice.reducer;

// Actions
export const { postgroup, getgrouplist } = slice.actions;

export const postGroup = (name) => async (dispatch) => {
  try {
    await api.post('/groups/', name)
      .then((response) => dispatch(postgroup(response.data)));
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
