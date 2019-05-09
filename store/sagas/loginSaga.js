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

const login = (isIter) => ({
  token: '123123',
  isIter: isIter
})

function* loginAsync (action) {
  let { isIter } = action
  try {
    const data = yield call(login(isIter))
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
