import { AnyAction } from 'redux';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { createKeycloakStudents, deleteKeycloakStudents, uploadEnrollData } from '../../api/requests';
import * as A from './actions';
import * as C from './constants';
import notitier from '../../utils/notifications';

export function* uploadDataWorker(action: AnyAction) {
    try {
        yield call(uploadEnrollData, action.file, action.filename);
        yield put(A.uploadDataSuccess());
        notitier.success('Wysłanie pliku powiodło się.');
    } catch (error) {
        yield put(A.uploadDataFail());
        notitier.alert('Wysłanie pliku nie powiodło się.');
    }
}

export function* registerStudentsWorker(action: AnyAction) {
    try {
        yield call(createKeycloakStudents, action.file, action.filename);
        yield put(A.registerStudentsSuccess());
        notitier.success('Rejestracja studentów powiodła się.');
    } catch (error) {
        yield put(A.registerStudentsFail());
        notitier.success('Rejestracja studentów nie powiodła się.');
    }
}

export function* deleteStudentsWorker() {
    try {
        yield call(deleteKeycloakStudents);
        yield put(A.deleteStudentsSuccess());
        notitier.success('Usunięcie studentów powiodło się.');
    } catch (error) {
        yield put(A.deleteStudentsFail());
        notitier.success('Usunięcie studentów nie powiodło się.');
    }
}

export function* dataUploadAndDownloadWatcher() {
    yield all([
        takeEvery(C.DataUploadAndDownloadActionType.UploadDataRequest, uploadDataWorker),
        takeEvery(C.DataUploadAndDownloadActionType.RegisterStudentsRequest, registerStudentsWorker),
        takeEvery(C.DataUploadAndDownloadActionType.DeleteStudentsRequest, deleteStudentsWorker),
    ]);
};