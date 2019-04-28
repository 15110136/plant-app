import { GEOCODING_FETCHING, GEOCODING_FETCHING_SUCCESS, GEOCODING_FETCHING_FAIL } from "../../actionType";

const initialState = {
  isFetching: false
}

export default mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case GEOCODING_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case GEOCODING_FETCHING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        info: action.data
      }
    case GEOCODING_FETCHING_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    
    default:
      return state
  }
}