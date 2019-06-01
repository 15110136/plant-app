import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESSS
} from "../../actionType";
import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

const API_HOST = "https://hire-find.herokuapp.com";

export function* watchLoginAsync() {
  yield takeLatest(LOGIN, loginAsync);
}
export function* watchRegisterAsync() {
  yield takeLatest(REGISTER, registerAsync);
}

function login({ email, password, role }) {
  return axios.request({
    method: "post",
    url: `${API_HOST}/api/login`,
    data: {
      email,
      password,
      role
    }
  });
}

function register({ email, password, phone, address, coords }) {
  return axios.request({
    method: "post",
    url: `${API_HOST}/api/client/register`,
    data: {
      email,
      password,
      phone,
      address,
      coords
    }
  });
}

function* registerAsync({ user }) {
  try {
    let {
      data: { data }
    } = yield call(register, user);
    data.isSuccess
      ? yield put({
          type: REGISTER_SUCCESSS,
          payload: data.token
        })
      : yield put({
          type: REGISTER_FAIL,
          payload: data.err
        });
  } catch (error) {
    yield put({
      type: REGISTER_FAIL,
      payload: "Server fail"
    });
  }
}

function* loginAsync({ user }) {
  try {
    let {
      data: { data }
    } = yield call(login, user);
    data.isSuccess
      ? yield put({
          type: LOGIN_SUCCESS,
          payload: data.token
        })
      : yield put({
          type: LOGIN_FAIL,
          payload: data.err
        });
  } catch (error) {
    yield put({
      type: LOGIN_FAIL,
      payload: "Server fail"
    });
  }
}
