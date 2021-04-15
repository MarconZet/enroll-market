import { put, takeEvery, all, call } from 'redux-saga/effects';
import { getSubjects, getTeachers } from '../../api/requests';
import * as A from './actions';
import * as C from './constants'
import notitier from '../../utils/notifications';

export function* getGlobalDataWorker() {
    try {
        const { data: subjects } = yield call(getSubjects);
        const { data: teachers } = yield call(getTeachers);
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