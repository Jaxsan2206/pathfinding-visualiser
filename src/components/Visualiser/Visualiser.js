import React, { useEffect } from 'react'
import Node from '../Node/Node'
import './Visualiser.css';
import { connect } from 'react-redux';
import { createGrid } from '../../helpers/createGrid';
import { dijkstra } from '../../algorithms/dijkstra';
import { generateGrid, toggleWall } from '../../reducers/grid';
import { deepClone } from '../../helpers/deepClone';
import { bfsDfs } from '../../algorithms/bfsDfs';
import { astar } from '../../algorithms/aStar';
import { createMaze, recursiveDivisionMaze } from '../../algorithms/generateMaze';

const Visualiser = ({ animate, generateGrid, grid, startCoords, endCoords, createMaze  }) => {
  const handleClick = () => {
    animate('djikstra')
  }

  const mazeHandler = () => {
    createMaze()
  }

  useEffect(() => {
    generateGrid()
  }, [generateGrid])
  
  return (
    <div>
      {grid?.map((row, idx) => {
        return (
          <div className="grid-row" key={`row-${idx}`}>
            {row?.map((node) => (
              <Node
                col={node.col}
                row={node.row}
                isVisited ={node.isVisited}
                isWall ={node.isWall}
                isStart={node.col === startCoords.col && node.row === startCoords.row}
                isEnd={node.col === endCoords.col && node.row === endCoords.row}
                isShortestPathNode={node.isShortestPathNode}
                key={`node-${node.row}-${node.col}`}
              />
            ))}
          </div>
        );
      })}
      <button onClick={() => handleClick()}>Visualise</button>
      <button onClick={() => mazeHandler()}>Create Maze</button>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    grid: state.grid.grid,
    startCoords: state.grid.startNode,
    endCoords: state.grid.endNode,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    animate: (grid, startNode, endNode, algorithm) => {
      const gridSnapshot = deepClone(grid)
      const startNodeSnapshot =gridSnapshot[startNode.row][startNode.col];
      const endNodeSnapshot = gridSnapshot[endNode.row][endNode.col];
      const selectedAlgorithm = algorithm === "djikstra" ?  
      // bfsDfs
      // dijkstra 
      astar
      : null;
      selectedAlgorithm(gridSnapshot, startNodeSnapshot, endNodeSnapshot, dispatch);
    },
    generateGrid: () => {
      const grid = createGrid(15, 50)
      dispatch(generateGrid(grid))
    },
    generateMaze: (grid, startNode, endNode) => {
      const gridSnapshot = deepClone(grid)
      const startNodeSnapshot =gridSnapshot[startNode.row][startNode.col];
      const endNodeSnapshot = gridSnapshot[endNode.row][endNode.col];
      const wallsToAnimate = []
      recursiveDivisionMaze(gridSnapshot, 2, 12, 2, 47,'vertical', false, startNodeSnapshot, endNodeSnapshot, wallsToAnimate)
      for (let i = 0; i < wallsToAnimate.length; i++){
        setTimeout(() => {
          dispatch(toggleWall(wallsToAnimate[i]))
        }, i * 10)
      }
    }
  };
}

const mergeProps = (state, dispatchProps, ownProps) => {
  const { grid, startCoords, endCoords } = state
  const { animate, ...rest } = dispatchProps
  return {
    animate: (algorithm) => dispatchProps.animate(grid, startCoords, endCoords, algorithm),
    createMaze: () => dispatchProps.generateMaze(grid, startCoords, endCoords),
    ...rest,
    ...ownProps,
    ...state
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps )(Visualiser)