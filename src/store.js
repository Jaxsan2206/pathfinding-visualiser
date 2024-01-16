import { configureStore } from '@reduxjs/toolkit'
import gridReducer from './reducers/grid';
import shortestPathReducer from './reducers/shortestPath';
import mouseEventReducer from './reducers/mouseEvent';

export default configureStore({
  reducer: {
    grid: gridReducer,
    shortestPath: shortestPathReducer,
    mouseEvent: mouseEventReducer
  },
})