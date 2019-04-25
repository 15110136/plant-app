import { all } from "redux-saga/effects"

import { watchLoginAsync } from "./loginSaga";

export default function* rootSaga () {
  yield all([
    watchLoginAsync(),
  ])
}