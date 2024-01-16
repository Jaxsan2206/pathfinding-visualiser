import { createSlice } from '@reduxjs/toolkit'

export const shortestPathSlice = createSlice({
  name: "shortestPath",
  initialState: {
    value: [],
  },
  reducers: {
    updateShortestPath: (state, { payload }) => {
      state.value = state.value.concat(payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateShortestPath } = shortestPathSlice.actions

export default shortestPathSlice.reducer