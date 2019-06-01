import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER, REGISTER_FAIL, REGISTER_SUCCESSS } from "../../actionType";

const initialState = {
  isLogined: false,
  isFetching: false,
  token: '',
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
        token: action.payload,
        isLogined: true
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    case REGISTER:
      return {
        ...state,
        isFetching: true
      }
    case REGISTER_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    case REGISTER_SUCCESSS:
      return {
        ...state,
        isFetching: false,
        token: action.payload,
        isLogined: true
      }
    default:
      return state
  }
}