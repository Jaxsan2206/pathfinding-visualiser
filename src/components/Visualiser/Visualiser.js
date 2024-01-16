import React from 'react'
import Node from '../Node/Node'
import './Visualiser.css';
import { connect } from 'react-redux';
import { createGrid } from '../../helpers/createGrid';
import { dijkstra } from '../../algorithms/dijkstra';

const Visualiser = ({ animate }) => {

  const grid = createGrid(15, 50)

  const handleClick = () => {
    animate(grid, 'djikstra')
  }

  return (
    <div>
      {grid?.map((row, idx) => {
        return (
          <div className="grid-row" key={`row-${idx}`}>
            {row?.map((node) => (
              <Node
                col={node.col}
                row={node.row}
                key={`node-${node.row}-${node.col}`}
              ></Node>
            ))}
          </div>
        );
      })}
      <button onClick={() => handleClick()}>Visualise</button>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    startCoords: state.grid.startNode,
    endCoords: state.grid.endNode,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //  We don't need this here cos it isn't changing state
    animate: (grid, startNode, endNode, algorithm) => {
      const startNodeSnapshot = grid[startNode.row][startNode.col];
      const endNodeSnapshot = grid[endNode.row][endNode.col];
      const selectedAlgorithm = algorithm === "djikstra" ? dijkstra : null;
      selectedAlgorithm(grid, startNodeSnapshot, endNodeSnapshot, dispatch);
    },
  };
}

const mergeProps = (state, dispatchProps, ownProps) => {
  const { startCoords, endCoords } = state
  return {
    animate: (grid, algorithm) => dispatchProps.animate(grid, startCoords, endCoords, algorithm),
    ...ownProps
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps )(Visualiser)