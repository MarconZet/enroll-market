import { AnyAction } from 'redux';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { getOneForOneOffers } from '../../api/requests';
import * as A from './actions';
import * as C from './constants'
import notitier from '../../utils/notifications';
import { OffersManagementActionType } from '../offersManagement/constants';

export function* getPageWorker(action: AnyAction) {
    try {
        const { data: { content } } = yield call(getOneForOneOffers);
        yield put(A.getPageSuccess(content, 1));
    } catch (error) {
        yield put(A.getPageFail());
        notitier.alert('Ładowanie strony nie powiodło się. Spróbuj jeszcze raz.');
    }
}

export function* applyFiltersWorker() {
    yield put(A.getPageRequest(1));
}

export function* offersListingWatcher() {
    yield all([
        takeEvery([C.OffersListingActionType.GetPageRequest, OffersManagementActionType.DeleteOfferSuccess], getPageWorker),
        takeEvery([C.OffersListingActionType.ApplyFilters, C.OffersListingActionType.SetType], applyFiltersWorker),
    ]);
};
