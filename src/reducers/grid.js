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
    toggleWall: (state, { payload }) => {
      let row, col
      if (payload.length){
        row = payload[0]
        col = payload[1]
      } else {
        row = payload.row;
        col = payload.col
      }
      const node = state.grid[row][col]
      const newNode = { ...node, isWall: !node.isWall };
      state.grid[row][col] = newNode
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  updateStartNode,
  updateEndNode,
  generateGrid,
  updateVisited,
  updateShortestPath,
  toggleWall,
} = gridSlice.actions;

export default gridSlice.reducer