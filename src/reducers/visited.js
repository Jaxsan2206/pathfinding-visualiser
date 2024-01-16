import { createSlice } from '@reduxjs/toolkit'

export const visitedSlice = createSlice({
  name: "visited",
  initialState: {
    value: [],
  },
  reducers: {
    updateVisited: (state, { payload }) => {
      state.value = state.value.concat(payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateVisited } = visitedSlice.actions

export default visitedSlice.reducer