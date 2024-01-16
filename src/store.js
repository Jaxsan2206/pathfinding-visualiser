import { configureStore } from '@reduxjs/toolkit'
import gridReducer from './reducers/grid';
import mouseEventReducer from './reducers/mouseEvent';

export default configureStore({
  reducer: {
    grid: gridReducer,
    mouseEvent: mouseEventReducer
  },
})