import { createSlice } from '@reduxjs/toolkit'

export const mouseEventSlice = createSlice({
  name: "mouseEvent",
  initialState: {
    isStartPressed: false,
    isEndPressed: false,
  },
  reducers: {
    updateStartPress: (state, { payload }) => {
      state.isStartPressed = payload
    },
    updateEndPress: (state, { payload }) => {
      state.isEndPressed = payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStartPress, updateEndPress } = mouseEventSlice.actions

export default mouseEventSlice.reducer