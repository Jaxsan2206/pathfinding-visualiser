import { updateShortestPath, updateVisited } from "../reducers/grid";

export function astar(grid, startNode, finishNode, dispatch) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  const visitedNodesInOrder = [];

  startNode.distance = 0;
  startNode.totalDistance = 0;
  startNode.direction = "up";
  
  let unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {
    let currentNode = closestNode(unvisitedNodes);
    while (currentNode.isWall && unvisitedNodes.length) {
      currentNode = closestNode(unvisitedNodes)
    }
    if (currentNode.distance === Infinity) return false;
    visitedNodesInOrder.push(currentNode);
    currentNode.isVisited = true;
    if (currentNode === finishNode) {
      handleDispatch(visitedNodesInOrder, finishNode, dispatch)
    }
    updateNeighbors(currentNode, grid, finishNode);
  }
}

function closestNode(unvisitedNodes) {
  let currentClosest, index;
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (!currentClosest || currentClosest.totalDistance > unvisitedNodes[i].totalDistance) {
      currentClosest = unvisitedNodes[i];
      index = i;
    } else if (currentClosest.totalDistance === unvisitedNodes[i].totalDistance) {
      if (currentClosest.heuristicDistance > unvisitedNodes[i].heuristicDistance) {
        currentClosest = unvisitedNodes[i];
        index = i;
      }
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
}

function updateNeighbors(currentNode, grid, finishNode) {
  let neighbors = getNeighbors(currentNode, grid);
  for (let neighbor of neighbors) {
    if (finishNode) {
      updateNode(currentNode, neighbor, finishNode);
    } else {
      updateNode(currentNode, neighbor);
    }
  }
}

function updateNode(currentNode, targetNode, actualTargetNode) {
  let distance = getDistance(currentNode, targetNode);
  if (!targetNode.heuristicDistance) targetNode.heuristicDistance = manhattanDistance(targetNode, actualTargetNode);
  let distanceToCompare = currentNode.distance + targetNode.weight + distance[0];
  if (distanceToCompare < targetNode.distance) {
    targetNode.distance = distanceToCompare;
    targetNode.totalDistance = targetNode.distance + targetNode.heuristicDistance;
    targetNode.previousNode = currentNode;
    targetNode.path = distance[1];
    targetNode.direction = distance[2];
  }
}

function getNeighbors(currentNode, grid) {
  const { row, col } = currentNode;
  let neighbors = [];
  let potentialNeighbor;
  if (grid[row - 1] && grid[row - 1][col]) {
    potentialNeighbor = grid[row-1][col]
    if (!potentialNeighbor.isWall) neighbors.push(potentialNeighbor);
  }
  if (grid[row + 1] && grid[row + 1][col]) {
    potentialNeighbor = grid[row+1][col]
    if (!potentialNeighbor.isWall) neighbors.push(potentialNeighbor);
  }
  if (grid[row][col - 1]) {
    potentialNeighbor = grid[row][col-1];
    if (!potentialNeighbor.isWall) neighbors.push(potentialNeighbor);
  }
  if (grid[row][col + 1]) {
    potentialNeighbor = grid[row][col+1]
    if (!potentialNeighbor.isWall) neighbors.push(potentialNeighbor);
  }

  return neighbors;
}


function getDistance(nodeOne, nodeTwo) {
  const { row: row1, col: col1 } = nodeOne;
  const { row: row2, col: col2 } = nodeTwo;
  if (row2 < row1 && col1 === col2) {
    if (nodeOne.direction === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.direction === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.direction === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.direction === "down") {
      return [3, ["r", "r", "f"], "up"];
    } else if (nodeOne.direction === "up-right") {
      return [1.5, null, "up"];
    } else if (nodeOne.direction === "down-right") {
      return [2.5, null, "up"];
    } else if (nodeOne.direction === "up-left") {
      return [1.5, null, "up"];
    } else if (nodeOne.direction === "down-left") {
      return [2.5, null, "up"];
    }
  } else if (row2 > row1 && col1 === col2) {
    if (nodeOne.direction === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.direction === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.direction === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.direction === "down") {
      return [1, ["f"], "down"];
    } else if (nodeOne.direction === "up-right") {
      return [2.5, null, "down"];
    } else if (nodeOne.direction === "down-right") {
      return [1.5, null, "down"];
    } else if (nodeOne.direction === "up-left") {
      return [2.5, null, "down"];
    } else if (nodeOne.direction === "down-left") {
      return [1.5, null, "down"];
    }
  }
  if (col2 < col1 && row1 === row2) {
    if (nodeOne.direction === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.direction === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.direction === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.direction === "down") {
      return [2, ["r", "f"], "left"];
    } else if (nodeOne.direction === "up-right") {
      return [2.5, null, "left"];
    } else if (nodeOne.direction === "down-right") {
      return [2.5, null, "left"];
    } else if (nodeOne.direction === "up-left") {
      return [1.5, null, "left"];
    } else if (nodeOne.direction === "down-left") {
      return [1.5, null, "left"];
    }
  } else if (col2 > col1 && row1 === row2) {
    if (nodeOne.direction === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.direction === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.direction === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.direction === "down") {
      return [2, ["l", "f"], "right"];
    } else if (nodeOne.direction === "up-right") {
      return [1.5, null, "right"];
    } else if (nodeOne.direction === "down-right") {
      return [1.5, null, "right"];
    } else if (nodeOne.direction === "up-left") {
      return [2.5, null, "right"];
    } else if (nodeOne.direction === "down-left") {
      return [2.5, null, "right"];
    }
  } 
}



function manhattanDistance(nodeOne, nodeTwo) {
  const { row: row1, col: col1 } = nodeOne;
  const { row: row2, col: col2 } = nodeTwo;

  let xChange = Math.abs(row1 - row2);
  let yChange = Math.abs(col1 - col2);

  return (xChange + yChange);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}


export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
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
      }, 100 * i);
    }
    setTimeout(() => {
      dispatch(updateVisited(visitedNodesInOrder[i]));
    }, 100 * i);
  }
  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        dispatch(updateShortestPath(nodesInShortestPathOrder[i]));
      }, 100 * i);
    }
  };
};
