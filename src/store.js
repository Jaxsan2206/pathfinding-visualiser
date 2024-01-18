import { configureStore } from '@reduxjs/toolkit'
import gridReducer from './reducers/grid';
import mouseEventReducer from './reducers/mouseEvent';
import appReducer from './reducers/app';


export default configureStore({
  reducer: {
    grid: gridReducer,
    mouseEvent: mouseEventReducer,
    app: appReducer
  },
})