import { combineReducers } from "redux";
import authenReducer from './authenReducer'
import mapReducer from './mapReducer'
import iterReducer from './iterReducer'

const rootReducers = combineReducers({
  authenReducer,
  mapReducer,
  iter: iterReducer
})

export default rootReducers