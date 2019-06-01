import { call, all } from "redux-saga/effects"

import { watchLoginAsync, watchRegisterAsync } from "./userSaga";
import { watchFetchIter } from "./itersSaga";

export default function* rootSaga () {
  yield all([
    watchLoginAsync(),
    watchRegisterAsync(),
    watchFetchIter()
  ])
}