import { createSlice } from '@reduxjs/toolkit'

export const gridSlice = createSlice({
  name: 'grid',
  initialState: {
    grid: [],
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
    generateGrid: (state, { payload }) => {
      state.grid = payload
    },
    updateStartNode: (state, { payload }) => {
      const [ row, col ] = payload
      state.startNode.row = row;
      state.startNode.col = col;
    },
    updateEndNode: (state, { payload }) => {
      const [ row, col ] = payload
      state.endNode.row = row
      state.endNode.col = col
    },
    updateVisited: (state, { payload }) => {
      const { row, col } = payload;
      const node = state.grid[row][col]
      const newNode = { ...node, isVisited: true };
      state.grid[row][col] = newNode
    },
    updateShortestPath: (state, { payload }) => {
      const { row, col } = payload;
      const node = state.grid[row][col]
      const newNode = { ...node, isShortestPathNode: true };
      state.grid[row][col] = newNode
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateStartNode, updateEndNode, generateGrid, updateVisited, updateShortestPath } = gridSlice.actions

export default gridSlice.reducer