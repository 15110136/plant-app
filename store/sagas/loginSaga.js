import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "../../actionType";
import { put, takeLatest, call } from "redux-saga/effects";
import axios from 'axios'

const API_HOST = 'https://dog.ceo/api/breeds/image/random'

export function* watchLoginAsync () {
  yield takeLatest(LOGIN, loginAsync)
}

// function login () {
//   return axios({
//     method: 'get',
//     url: API_HOST
//   })
// }

const login = () => (
  // axios({
  //   method: 'GET',
  //   url: API_HOST
  // })
  1
)

function* loginAsync () {
  try {
    const data = yield call(login)
    yield put({
      type: LOGIN_SUCCESS,
      payload: data
    })
  } catch (error) {
    yield put({
      type: LOGIN_FAIL,
      payload: error
    })
  }
}
