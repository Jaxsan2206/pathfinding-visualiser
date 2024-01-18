import React, { useEffect, useState } from 'react'
import Node from '../Node/Node'
import './Visualiser.css';
import { connect } from 'react-redux';
import { createGrid } from '../../helpers/createGrid';
import { dijkstra } from '../../algorithms/dijkstra';
import { clearAnimation, clearWalls, generateGrid, toggleWall } from '../../reducers/grid';
import { deepClone } from '../../helpers/deepClone';
import { bfsDfs } from '../../algorithms/bfsDfs';
import { astar } from '../../algorithms/aStar';
import { recursiveDivisionMaze } from '../../algorithms/generateMaze';
import { Button, Form } from 'react-bootstrap';
import { updateRunning } from '../../reducers/app';

const Visualiser = ({ animate, generateGrid, grid, startCoords, endCoords, createMaze, clearWalls, clearAnimation, isRunning  }) => {
  const [ algorithm, setAlgorithm ] = useState('')
  const [speed, setSpeed] = useState(100)

  const handleClick = () => {
    animate(algorithm, speed)
  }

  const mazeHandler = () => {
    createMaze()
  }

  useEffect(() => {
    generateGrid()
  }, [generateGrid])
  
  return (
    <div>
      <nav>
        <Form.Select
          onChange={(e) => setAlgorithm(e.target.value)}
          style={{ maxWidth: "200px" }}
          disabled={isRunning}
        >
          <option value={""}>Pick an Algorithm</option>
          <option value={"bfs"}>Breadth First Search</option>
          <option value={"dfs"}>Depth First Search</option>
          <option value={"da"}>Dijkstra's Algorithm</option>
          <option value={"aa"}>A* Algorithm</option>
        </Form.Select>
        <div>
          <p>Controls</p>
          <div  className="slidecontainer">
          <label htmlFor={"mySpeedRange"}>Speed</label>
          <input
            onChange={(e) => setSpeed(e.target.value)}
            type="range"
            min="10"
            max="1000"
            value={speed}
            className="slider"
            id="mySpeedRange"
            disabled={isRunning}
          />
          <span>{speed + " ms"}</span>
          </div>
          <div className="button_container">
            <Button
              variant="primary"
              onClick={() => handleClick()}
              disabled={!algorithm || isRunning}
            >
              Visualise
            </Button>
            <Button variant="secondary" onClick={() => mazeHandler()} disabled={isRunning}>
              Create Maze
            </Button>
          </div>
        </div>
        <div className="button_container">
            <Button variant="danger" onClick={() => clearWalls()} disabled={isRunning}>Clear Walls</Button>
            <Button variant="danger" onClick={() => clearAnimation()} disabled={isRunning}>Clear Algorithm</Button>
        </div>
      </nav>
      <div className='grid'>
      {grid?.map((row, idx) => {
        return (
          <div className="grid-row" key={`row-${idx}`}>
            {row?.map((node) => (
              <Node
                col={node.col}
                row={node.row}
                isVisited={node.isVisited}
                isWall={node.isWall}
                isStart={
                  node.col === startCoords.col && node.row === startCoords.row
                }
                isEnd={node.col === endCoords.col && node.row === endCoords.row}
                isShortestPathNode={node.isShortestPathNode}
                key={`node-${node.row}-${node.col}`}
              />
            ))}
          </div>
        );
      })}
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    grid: state.grid.grid,
    startCoords: state.grid.startNode,
    endCoords: state.grid.endNode,
    isRunning: state.app.isRunning
  }
}

const mapDispatchToProps = dispatch => {
  return {
    animate: (grid, startNode, endNode, algorithm, speed) => {
      const gridSnapshot = deepClone(grid)
      const startNodeSnapshot =gridSnapshot[startNode.row][startNode.col];
      const endNodeSnapshot = gridSnapshot[endNode.row][endNode.col];
      const selectedAlgorithm =
        algorithm === "da"
          ? dijkstra
          : algorithm === "bfs" || algorithm === "dfs"
          ? bfsDfs
          : algorithm === "aa"
          ? astar
          : null;
      dispatch(updateRunning(true))
      selectedAlgorithm(gridSnapshot, startNodeSnapshot, endNodeSnapshot, dispatch, speed, algorithm);
    },
    generateGrid: () => {
      const grid = createGrid(15, 50)
      dispatch(generateGrid(grid))
    },
    generateMaze: (grid, startNode, endNode) => {
      dispatch(clearWalls())
      dispatch(updateRunning(true))
      const gridSnapshot = deepClone(grid)
      const startNodeSnapshot =gridSnapshot[startNode.row][startNode.col];
      const endNodeSnapshot = gridSnapshot[endNode.row][endNode.col];
      const wallsToAnimate = []
      recursiveDivisionMaze(gridSnapshot, 2, 12, 2, 47,'vertical', false, startNodeSnapshot, endNodeSnapshot, wallsToAnimate)
      for (let i = 0; i < wallsToAnimate.length; i++){
        setTimeout(() => {
          dispatch(toggleWall(wallsToAnimate[i]))
        }, i * 10)
        if (i === wallsToAnimate.length - 1){
          setTimeout(() => {
            dispatch(updateRunning(false))
          }, i * 10)
        }
      }
    },
    clearWalls: () => {
      dispatch(clearWalls())
    },
    clearAnimation: () => {
      dispatch(clearAnimation())
    },
  };
}

const mergeProps = (state, dispatchProps, ownProps) => {
  const { grid, startCoords, endCoords } = state
  const { animate, ...rest } = dispatchProps
  return {
    animate: (algorithm, speed) => dispatchProps.animate(grid, startCoords, endCoords, algorithm, speed),
    createMaze: () => dispatchProps.generateMaze(grid, startCoords, endCoords),
    ...rest,
    ...ownProps,
    ...state
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps )(Visualiser)