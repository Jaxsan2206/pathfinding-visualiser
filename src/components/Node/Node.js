import React from 'react'
import './Node.css';
import { connect } from 'react-redux';
import { updateEndPress, updateStartPress } from '../../reducers/mouseEvent';
import { updateEndNode, updateStartNode } from '../../reducers/grid';

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
    isEndPressed: state.mouseEvent.isEndPressed
  }
}


const mapDispatchToProps = dispatch => {
  return {
    handleMouseDown: (target) => {
      if (target.className.includes('node-start')){
        dispatch(updateStartPress(true))
      } else if (target.className.includes('node-end')) {
        dispatch(updateEndPress(true))
      } else if (target.className === 'node '){
        console.log('clicked empty node')
      }
    },
    handleMouseEnter: (target, isStartPressed, isEndPressed) => {
      if (isStartPressed){
        const [ row, col ] = target.id.split('-').map(str => parseInt(str));
        dispatch(updateStartNode([row, col]))
      } else if (isEndPressed){
        const [ row, col ] = target.id.split('-').map(str => parseInt(str));
        dispatch(updateEndNode([row, col]))
      }
    },
    handleMouseUp: () => {
      dispatch(updateStartPress(false))
      dispatch(updateEndPress(false))
    },
  };
}


const mergeProps = (state, dispatchProps, ownProps ) => {
  const { isStart, isEnd, isVisited, isShortestPathNode } = ownProps
  const { isStartPressed, isEndPressed } = state
  const { handleMouseDown, handleMouseEnter, ...rest } = dispatchProps

  const nodeType = isShortestPathNode
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
    handleMouseDown: (target) => handleMouseDown(target),
    handleMouseEnter: (target) => handleMouseEnter(target, isStartPressed, isEndPressed),
    ...rest
  });
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Node)