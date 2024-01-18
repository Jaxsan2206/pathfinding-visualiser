import { updateVisited, updateShortestPath} from "../reducers/grid";

export const bfsDfs = (
  grid,
  startNode,
  finishNode,
  dispatch
) => {
  let name = "bfs";

  const visitedNodesInOrder = [];

  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  let structure = [startNode];
  let exploredNodes = {}
  const startKey = `${startNode.row}-${startNode.col}`
  exploredNodes[startKey] = true;
  while (!!structure.length) {
    let currentNode = name === "bfs" ? structure.shift() : structure.pop();
    visitedNodesInOrder.push(currentNode);
    const key = `${currentNode.row}-${currentNode.col}`;
    if (name === "dfs") exploredNodes[key] = true;
    currentNode.isVisited = true;
    if (currentNode === finishNode) {
      handleDispatch(visitedNodesInOrder, finishNode, dispatch);
      return visitedNodesInOrder;
    }
    let currentNeighbors = getNeighbors(currentNode, grid, name);
    currentNeighbors.forEach((neighbor) => {
      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      if (!exploredNodes[neighborKey]) {
        if (name === "bfs") exploredNodes[neighborKey] = true;
        neighbor.previousNode = currentNode;
        structure.push(neighbor);
      }
    });
  }
};

const getNeighbors = (currentNode, grid, name) => {
  const { row, col } = currentNode;
  let neighbors = [];
  let potentialNeighbor;
  if (grid[row - 1] && grid[row - 1][col]) {
    potentialNeighbor = grid[row - 1][col];
    if (!potentialNeighbor.isWall) {
      if (name === "bfs") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }

  if (grid[row][col + 1]) {
    potentialNeighbor = grid[row][col + 1];

    if (!potentialNeighbor.isWall) {
      if (name === "bfs") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  if (grid[row + 1] && grid[row + 1][col]) {
    potentialNeighbor = grid[row + 1][col];
    if (!potentialNeighbor.isWall) {
      if (name === "bfs") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  if (grid[row][col - 1]) {
    potentialNeighbor = grid[row][col - 1];
    if (!potentialNeighbor.isWall) {
      if (name === "bfs") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  return neighbors;
};

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null && currentNode.previousNode !==currentNode) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

const handleDispatch = (visitedNodesInOrder, finishNode, dispatch) => {
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, 10 * i);
    }
    setTimeout(() => {
      dispatch(updateVisited(visitedNodesInOrder[i]));
    }, 10 * i);
  }
  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        dispatch(updateShortestPath(nodesInShortestPathOrder[i]));
      }, 10 * i);
    }
  };
};

