import { LOGIN, GEOCODING_FETCHING } from "../../actionType";

export const loginAction = () => ({
  type: LOGIN
})

export const geocodingAction = geo => ({
  type: GEOCODING_FETCHING,
  geo
})