import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const makeStore = () => {
    const saga: SagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(saga)));

    (store as any).sagaTask = saga.run(rootSaga);

    return store;
}

export default makeStore;