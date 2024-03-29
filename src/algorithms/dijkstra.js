import { updateRunning } from "../reducers/app";
import { updateVisited, updateShortestPath } from "../reducers/grid";

export const dijkstra = (grid, startNode, finishNode, dispatch, speed) => {
  const visitedNodesInOrder = [];

  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) {
      handleDispatch(visitedNodesInOrder, finishNode, dispatch, speed);
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbours(closestNode, grid);
  }
};

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbours = (node, grid) => {
  const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  for (let neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
  }
};

function getUnvisitedNeighbours(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
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

const handleDispatch = (visitedNodesInOrder, finishNode, dispatch, speed) => {
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, speed * i);
    }
    setTimeout(() => {
      dispatch(updateVisited(visitedNodesInOrder[i]));
    }, speed * i);
  }
  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        dispatch(updateShortestPath(nodesInShortestPathOrder[i]));
      }, 10 * i);
      if (i === nodesInShortestPathOrder.length - 1) {
        setTimeout(() => {
          dispatch(updateRunning(false));
        }, 10 * i);
      }
    }
  };
};
