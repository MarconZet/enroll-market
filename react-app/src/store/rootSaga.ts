import { all, fork } from 'redux-saga/effects';
import testSaga from './test/sagas';

// TODO: fill sagas array
function* rootSaga() {
    yield all([
        fork(testSaga),
    ]);
}

export default rootSaga;