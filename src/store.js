import { configureStore } from '@reduxjs/toolkit'
import gridReducer from './reducers/grid';
import visitedReducer from './reducers/visited';
import shortestPathReducer from './reducers/shortestPath';
import mouseEventReducer from './reducers/mouseEvent';

export default configureStore({
  reducer: {
    grid: gridReducer,
    visited: visitedReducer,
    shortestPath: shortestPathReducer,
    mouseEvent: mouseEventReducer
  },
})