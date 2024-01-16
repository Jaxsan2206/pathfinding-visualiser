import { createSlice } from '@reduxjs/toolkit'

export const gridSlice = createSlice({
  name: 'grid',
  initialState: {
    startNode: {
      row: 7,
      col: 6
    },
    endNode: {
      row: 10,
      col: 20
    },
    wallNodes: []
  },
  reducers: {
    updateStartNode: (state, { payload }) => {
      const [ row, col ] = payload
      state.startNode.row = row
      state.startNode.col = col
    },
    updateEndNode: (state, { payload }) => {
      const [ row, col ] = payload
      state.endNode.row = row
      state.endNode.col = col
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { updateStartNode, updateEndNode } = gridSlice.actions

export default gridSlice.reducer