// https://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm
export function recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls, startNode, endNode, wallsToAnimate) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  const nodes = getAllNodes(grid)
  if (!surroundingWalls) {
    let relevantIds = [startNode, endNode];


    nodes.forEach(node => {
      if (!relevantIds.includes(node)) {
        const { row, col } = node;
        if (row === 0 || col === 0 || row === grid.length - 1 || col === grid[0].length - 1) {
          wallsToAnimate.push(node);
          node.isWall = true;
        }
      }
    });
    surroundingWalls = true;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    nodes.forEach(node => {
      const { row, col } = node;
      if (row === currentRow && col !== colRandom && col >= colStart - 1 && col <= colEnd + 1) {
        if (node !== startNode && node !== endNode) {
          wallsToAnimate.push(node);
          node.isWall = true;
        }
      }
    });
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls, startNode, endNode, wallsToAnimate);
    } else {
      recursiveDivisionMaze(grid, rowStart, currentRow - 2, colStart, colEnd, "vertical", surroundingWalls, startNode, endNode, wallsToAnimate);
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls, startNode, endNode, wallsToAnimate);
    } else {
      recursiveDivisionMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls, startNode, endNode, wallsToAnimate);
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    nodes.forEach(node => {
      const { row, col } = node;

      if (col === currentCol && row !== rowRandom && row >= rowStart - 1 && row <= rowEnd + 1) {
        if (node !== startNode && node !== endNode) {
          wallsToAnimate.push(node);
            node.isWall = true;
        }
      }
    });
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", surroundingWalls, startNode, endNode, wallsToAnimate);
    } else {
      recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls, startNode, endNode, wallsToAnimate);
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingWalls, startNode, endNode, wallsToAnimate);
    } else {
      recursiveDivisionMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls, startNode, endNode, wallsToAnimate);
    }
  }
};


function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}