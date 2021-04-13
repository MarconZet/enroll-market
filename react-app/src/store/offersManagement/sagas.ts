import { AnyAction } from 'redux';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { deleteOneForOneOffer } from '../../api/requests';
import * as A from './actions';
import * as C from './constants';

export function* deleteOfferWorker(action: AnyAction) {
    try {
        yield call(deleteOneForOneOffer, action.id);
        yield put(A.deleteOfferSuccess());
    } catch (error) {
        yield put(A.deleteOfferFail())
    }
}

export function* offersManagementWatcher() {
    yield all([
        takeEvery(C.OffersManagementActionType.DeleteOfferRequest, deleteOfferWorker),
    ]);
};