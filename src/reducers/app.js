import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isRunning: false,
  },
  reducers: {
    updateRunning: (state, { payload }) => {
      state.isRunning = payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { updateRunning } = appSlice.actions

export default appSlice.reducer