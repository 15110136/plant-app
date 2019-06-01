import { GEOCODING_FETCHING, GEOCODING_FETCHING_FAIL, GEOCODING_FETCHING_SUCCESS } from "../../actionType";
import { put, takeLatest, call } from "redux-saga/effects";
import { api } from "./api";

export function* watchGeocodingAsync () {
  yield takeLatest(GEOCODING_FETCHING, geocodingAsync)
}

function* geocodingAsync (action) {
  console.log(action.geo)
  // const { lat, lng } = action.geo
  // let latlng = lat + ',' + lng
  
  // try {
  //   const data = yield api.getAddreesFromGeo(latlng)
  //   yield put({
  //     type: GEOCODING_FETCHING_SUCCESS,
  //     data
  //   })
  // } catch (error) {
  //   console.log(error)
  //   yield put({
  //     type: GEOCODING_FETCHING_FAIL,
  //     error
  //   })
  // }
}
