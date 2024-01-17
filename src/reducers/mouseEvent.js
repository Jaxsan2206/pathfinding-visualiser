import { createSlice } from '@reduxjs/toolkit'

export const mouseEventSlice = createSlice({
  name: "mouseEvent",
  initialState: {
    isStartPressed: false,
    isEndPressed: false,
    isNodePressed: false,
  },
  reducers: {
    updateStartPress: (state, { payload }) => {
      state.isStartPressed = payload
    },
    updateEndPress: (state, { payload }) => {
      state.isEndPressed = payload
    },
    updateNodePress: (state, { payload }) => {
      state.isNodePressed = payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStartPress, updateEndPress, updateNodePress } = mouseEventSlice.actions

export default mouseEventSlice.reducer