import { LOGIN, GEOCODING_FETCHING } from "../../actionType";

export const loginAction = isIter => ({
  type: LOGIN,
  isIter
})

export const geocodingAction = geo => ({
  type: GEOCODING_FETCHING,
  geo
})