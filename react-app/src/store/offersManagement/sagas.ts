import { AnyAction } from 'redux';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { createOneForOneOffer, deleteOneForOneOffer } from '../../api/requests';
import * as A from './actions';
import * as C from './constants';
import notitier from '../../utils/notifications';

export function* deleteOfferWorker(action: AnyAction) {
    try {
        yield call(deleteOneForOneOffer, action.id);
        yield put(A.deleteOfferSuccess());
        notitier.success('Usunięcie oferty powiodło się.');
    } catch (error) {
        yield put(A.deleteOfferFail());
        notitier.alert('Usunięcie oferty nie powiodło się.');
    }
}

export function* createOfferWorker(action: AnyAction) {
    try {
        yield call(createOneForOneOffer, action.params);
        yield put(A.createOfferSuccess());
        notitier.success('Dodanie oferty powiodło się.');
    } catch (error) {
        yield put(A.createOfferFail());
        notitier.alert('Dodanie oferty nie powiodło się.');
    }
}

export function* offersManagementWatcher() {
    yield all([
        takeEvery(C.OffersManagementActionType.DeleteOfferRequest, deleteOfferWorker),
        takeEvery(C.OffersManagementActionType.CreateOfferRequest, createOfferWorker),
    ]);
};