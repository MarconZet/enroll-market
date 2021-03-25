import { put } from "redux-saga/effects";
import * as A from './actions'

export function* testSaga() {
    yield put(A.testSuccess());
};

export default testSaga;
