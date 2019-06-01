import { ITER_FETCHING, ITER_FETCHING_SUCCESS, ITER_FETCHING_FAIL } from "../../actionType";

const initialState = {
  isFetching: false,
  iter: {}
}

export default mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITER_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case ITER_FETCHING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        iter: action.payload
      }
    case ITER_FETCHING_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    
    default:
      return state
  }
}