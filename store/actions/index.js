import {
  LOGIN,
  GEOCODING_FETCHING,
  ITER_FETCHING,
  REGISTER
} from "../../actionType";

export const loginAction = user => ({
  type: LOGIN,
  user
});

export const registerAction = user => ({
  type: REGISTER,
  user
});

export const fetchIter = options => {
  return {
    type: ITER_FETCHING,
    options
  }
};

export const geocodingAction = geo => {
  return {
    type: GEOCODING_FETCHING,
    geo
  };
};
