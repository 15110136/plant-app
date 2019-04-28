import { call, all } from "redux-saga/effects"

import { watchLoginAsync } from "./loginSaga";
import { watchGeocodingAsync } from "./mapSaga";

export default function* rootSaga () {
  // yield call(watchGeocodingAsync)
  yield all([
    watchLoginAsync(),
    watchGeocodingAsync()
  ])
}