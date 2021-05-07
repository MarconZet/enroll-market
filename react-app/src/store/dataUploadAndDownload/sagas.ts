import { AnyAction } from 'redux';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { uploadEnrollData } from '../../api/requests';
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

export function* dataUploadAndDownloadWatcher() {
    yield all([
        takeEvery(C.DataUploadAndDownloadActionType.UploadDataRequest, uploadDataWorker),
    ]);
};