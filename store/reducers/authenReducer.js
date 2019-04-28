import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "../../actionType";

const initialState = {
  isLogined: false,
  isFetching: false,
  token: 0,
}

export default loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isFetching: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.payload
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    
    default:
      return state
  }
}