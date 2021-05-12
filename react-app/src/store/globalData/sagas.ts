import { put, takeEvery, all, call } from 'redux-saga/effects';
import { getSubjects, getTeachers } from '../../api/requests';
import * as A from './actions';
import * as C from './constants'
import notitier from '../../utils/notifications';
import { AnyAction } from 'redux';

export function* getGlobalDataWorker(action: AnyAction) {
    try {
        const { data: { content: subjects } } = yield call(getSubjects, action.token, { pageSize: 10000 });
        const { data: { content: teachers } } = yield call(getTeachers, action.token, { pageSize: 10000 });
        yield put(A.getGlobalDataSuccess(subjects, teachers));
    } catch (error) {
        yield put(A.getGlobalDataFail());
        notitier.alert('Ładowanie danych globalnych nie powiodło się. Odśwież, by spróbować jeszcze raz.');
    }
}

export function* globalDataWatcher() {
    yield all([
        takeEvery([C.GlobalDataActionType.GetGlobalDataRequest], getGlobalDataWorker),
    ]);
};