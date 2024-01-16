export const createGrid = (rows, cols) => {
    const grid = [];
    for (let i = 0; i < rows ; i++){
      let currentRow = [];
      for (let j = 0; j < cols; j++){
          currentRow.push({
            col: j,
            row: i,
            distance: Infinity,
            isVisited: false,
            previousNode: null,
            isShortestPathNode: false
          })
      }
      grid.push(currentRow)
    }
    return grid
}