import { combineReducers } from "redux";
import authenReducer from './authenReducer'
import mapReducer from './mapReducer'

const rootReducers = combineReducers({
  authenReducer,
  mapReducer
})

export default rootReducers