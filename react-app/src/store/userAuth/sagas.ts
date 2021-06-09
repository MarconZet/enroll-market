import { put, takeEvery, all, call } from 'redux-saga/effects';
import { getMe } from '../../api/requests';
import * as A from './actions';
import * as C from './constants'
import notitier from '../../utils/notifications';
import { AnyAction } from '@reduxjs/toolkit';

export function* getUserDataWorker(action: AnyAction) {
    try {
        const { data } = yield call(getMe);
        yield put(A.getUserDataSuccess(data));
    } catch (error) {
        yield put(A.getUserDataFail());
        notitier.alert('Ładowanie danych użytkownika nie powiodło się. Odśwież, by spróbować jeszcze raz.');
    }
}

export function* userDataWatcher() {
    yield all([
        takeEvery([C.UserAuthActionType.GetUserDataRequest], getUserDataWorker),
    ]);
};
