import {
  ITER_FETCHING,
  ITER_FETCHING_SUCCESS,
  ITER_FETCHING_FAIL
} from "../../actionType";
import { put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";

const API_HOST = "https://hire-find.herokuapp.com";

export function* watchFetchIter() {
  yield takeEvery(ITER_FETCHING, fetchIterAsync);
}

function fetchITer({ lat, lng, match }) {
  return axios.request({
    method: "get",
    url: `${API_HOST}/api/iter`,
    params: {
      lat,
      lng
    }
  });
}

function* fetchIterAsync({ options }) {
  let option = {
    lat: options.latitude,
    lng: options.longitude
  }
  try {
    let { data: { data, isSuccess, error } } = yield call(fetchITer, option)
    isSuccess
    ? yield put({
        type: ITER_FETCHING_SUCCESS,
        payload: data[0]
      })
    : yield put({
        type: ITER_FETCHING_FAIL,
        payload: error
      });
  } catch (error) {
    console.log(error)
  }

}
