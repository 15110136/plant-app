import { createStore, applyMiddleware } from "redux";
import rootReducer from '../store/reducers'

import createSagaMiddleware from 'redux-saga'
import rootSaga from '../store/sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

export default configStore = () => {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSaga)
  
  return store
}