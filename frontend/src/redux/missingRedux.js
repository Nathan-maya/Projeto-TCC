import { createSlice } from '@reduxjs/toolkit';

const missingSlice = createSlice({
  name: 'missing',
  initialState: {
    missing: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //create
    addMissingStart: (state,action) => {
      state.isFetching = true;
      state.error = false;
    },
    addMissingSuccess: (state, action) => {
      console.log('AddMissing')
      state.isFetching = false;
      state.missing=action.payload;
    },
    addMissingFailure: (state) => {
      state.isFetching = false;
      state.error = true;

    },
  },
});

export const { addMissingStart, addMissingSuccess, addMissingFailure } =
  missingSlice.actions;

export default missingSlice.reducer;
