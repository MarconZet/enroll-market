import { AnyAction } from 'redux';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { createOffer, createOneForOneOffer, deleteOffer } from '../../api/requests';
import * as A from './actions';
import * as C from './constants';
import notitier from '../../utils/notifications';

export function* deleteOfferWorker(action: AnyAction) {
    try {
        yield call(deleteOffer, action.id);
        yield put(A.deleteOfferSuccess());
        notitier.success('Usunięcie oferty powiodło się.');
    } catch (error) {
        yield put(A.deleteOfferFail());
        notitier.alert('Usunięcie oferty nie powiodło się.');
    }
}

export function* createOfferWorker(action: AnyAction) {
    try {
        if (action.type === C.OffersManagementActionType.CreateOneForOneOfferRequest) {
            yield call(createOneForOneOffer, {
                givenCourseId: action.givenCourseId,
                takenCourseId: action.takenCourseId,
            });
        } else if (action.type === C.OffersManagementActionType.CreateOfferRequest) {
            yield call(createOffer, {
                givenCourseId: action.givenCourseId,
                teacherIds: action.teacherIds,
                timeBlocks: action.timeBlocks,
            });
        }
        
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
        takeEvery([C.OffersManagementActionType.CreateOfferRequest, C.OffersManagementActionType.CreateOneForOneOfferRequest], createOfferWorker),
    ]);
};