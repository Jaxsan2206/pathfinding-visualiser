import React from 'react'
import './Node.css';
import { connect } from 'react-redux';
import { updateEndPress, updateNodePress, updateStartPress } from '../../reducers/mouseEvent';
import { toggleWall, updateEndNode, updateStartNode } from '../../reducers/grid';

const Node = ({ row, col, nodeType, handleMouseDown, handleMouseEnter, handleMouseUp }) => {
  const nodeClasses = `node ${nodeType}`;
  return (
    <div
      className={nodeClasses}
      id={`${row}-${col}`}
      onMouseDown={(e) => handleMouseDown(e.target)}
      onMouseEnter={(e) => handleMouseEnter(e.target)}
      onMouseUp={() => handleMouseUp()}
    />
  );
};

const mapStateToProps = state => {
  return {
    isStartPressed: state.mouseEvent.isStartPressed,
    isEndPressed: state.mouseEvent.isEndPressed,
    isNodePressed: state.mouseEvent.isNodePressed,
    isRunning: state.app.isRunning
  }
}


const mapDispatchToProps = dispatch => {
  return {
    handleMouseDown: (target) => {
      if (target.className.includes('node-start')){
        dispatch(updateStartPress(true))
      } else if (target.className.includes('node-end')) {
        dispatch(updateEndPress(true))
      } else if (target.className === 'node ' || target.className.includes('node-wall') ){
        const [ row, col ] = target.id.split('-').map(str => parseInt(str));
        dispatch(updateNodePress(true))
        dispatch(toggleWall([ row, col ]))
      }
    },
    handleMouseEnter: (target, isStartPressed, isEndPressed, isNodePressed) => {
      if (isStartPressed){
        if (!target.className.includes('node-wall')){
          const [ row, col ] = target.id.split('-').map(str => parseInt(str));
          dispatch(updateStartNode([row, col]))
        }
      } else if (isEndPressed){
        if (!target.className.includes('node-wall')){
          const [ row, col ] = target.id.split('-').map(str => parseInt(str));
          dispatch(updateEndNode([row, col]))
        }
      } else if (isNodePressed){
        if (!target.className.includes('node-start') && !target.className.includes('node-end')){
          const [ row, col ] = target.id.split('-').map(str => parseInt(str));
          dispatch(toggleWall([ row, col ]))
        }
      }
    },
    handleMouseUp: () => {
      dispatch(updateStartPress(false))
      dispatch(updateEndPress(false))
      dispatch(updateNodePress(false))
    },
  };
}


const mergeProps = (state, dispatchProps, ownProps ) => {
  const { isStart, isEnd, isVisited, isShortestPathNode, isWall } = ownProps
  const { isStartPressed, isEndPressed, isNodePressed, isRunning } = state
  const { handleMouseDown, handleMouseEnter, ...rest } = dispatchProps

  const nodeType = isWall
    ? "node-wall"
    : isShortestPathNode
    ? "node-shortest-path"
    : isStart
    ? "node-start"
    : isEnd
    ? "node-end"
    : isVisited
    ? "node-visited"
    : "";

  return Object.assign({}, ownProps, {
    nodeType,
    handleMouseDown: (target) => {
      if (isRunning) return
      handleMouseDown(target)
    },
    handleMouseEnter: (target) => {
      if (isRunning) return
      handleMouseEnter(target, isStartPressed, isEndPressed, isNodePressed)
    },
    ...rest
  });
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Node)