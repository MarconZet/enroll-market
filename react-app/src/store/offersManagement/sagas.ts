import { AnyAction } from 'redux';
import { put, takeEvery, all, call, fork } from 'redux-saga/effects';
import { acceptOffer, createOffer, createOneForOneOffer, deleteOffer, editOffer, editOneForOneOffer } from '../../api/requests';
import * as A from './actions';
import * as C from './constants';
import notitier from '../../utils/notifications';
import { OfferParams } from '../../api/models';
import { getGlobalDataRequest } from '../globalData/actions';
import { refreshPageWorker } from '../offersListing/sagas';

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

export function* acceptOfferWorker(action: AnyAction) {
    try {
        yield call(acceptOffer, action.offerId, action.courseId);
        yield put(A.acceptOfferSuccess());
        notitier.success('Akceptacja oferty powiodła się.');
    } catch (error) {
        yield put(A.acceptOfferFail());
        notitier.alert('Akceptacja oferty nie powiodła się.');
    }
}

export function* createOfferWorker(action: AnyAction) {
    try {
        if (action.type === C.OffersManagementActionType.CreateOneForOneOfferRequest) {
            yield call(createOneForOneOffer, {
                givenCourseId: action.givenCourseId,
                takenCourseId: action.takenCourseId,
                comment: action.comment,
            });
        } else if (action.type === C.OffersManagementActionType.CreateOfferRequest) {
            const params: OfferParams = {
                givenCourseId: action.givenCourseId,
                offerConditions: {
                    teacherIds: action.teacherIds,
                    timeBlocks: action.timeBlocks,
                },
                comment: action.comment,
            };

            yield call(createOffer, params);
        }
        
        yield put(A.createOfferSuccess());
        notitier.success('Dodanie oferty powiodło się.');
    } catch (error) {
        yield put(A.createOfferFail());
        notitier.alert('Dodanie oferty nie powiodło się.');
    }
}

export function* editOfferWorker(action: AnyAction) {
    try {
        if (action.type === C.OffersManagementActionType.EditOneForOneOfferRequest) {
            yield call(editOneForOneOffer, action.id, {
                givenCourseId: action.givenCourseId,
                takenCourseId: action.takenCourseId,
                comment: action.comment,
            });
        } else if (action.type === C.OffersManagementActionType.EditOfferRequest) {
            const params: OfferParams = {
                givenCourseId: action.givenCourseId,
                offerConditions: {
                    teacherIds: action.teacherIds,
                    timeBlocks: action.timeBlocks,
                },
                comment: action.comment,
            };

            yield call(editOffer, action.id, params);
        }
        
        yield put(A.editOfferSuccess());
        notitier.success('Edytowanie oferty powiodło się.');
    } catch (error) {
        yield put(A.editOfferFail());
        notitier.alert('Edytowanie oferty nie powiodło się.');
    }
}

export function* acceptOfferSuccessWorker() {
    yield put(getGlobalDataRequest());
    yield fork(refreshPageWorker);
}

export function* offersManagementWatcher() {
    yield all([
        takeEvery(C.OffersManagementActionType.DeleteOfferRequest, deleteOfferWorker),
        takeEvery([C.OffersManagementActionType.CreateOfferRequest, C.OffersManagementActionType.CreateOneForOneOfferRequest], createOfferWorker),
        takeEvery(C.OffersManagementActionType.AcceptOfferRequest, acceptOfferWorker),
        takeEvery(C.OffersManagementActionType.AcceptOfferSuccess, acceptOfferSuccessWorker),
        takeEvery([C.OffersManagementActionType.EditOfferRequest, C.OffersManagementActionType.EditOneForOneOfferRequest], editOfferWorker),
    ]);
};