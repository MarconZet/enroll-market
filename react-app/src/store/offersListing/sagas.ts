import { put, takeEvery, all, call } from 'redux-saga/effects';
import { getOneForOneOffers } from '../../api/requests';
import * as A from './actions';
import * as C from './constants'
import { mockFiltersData } from './mockData';

// TODO: this workers are temporarily mocks; update when api will be available

export function* getPageWorker(action: C.OffersListingAction) {
    try {
        const { data } = yield call(getOneForOneOffers);
        yield put(A.getPageSuccess(data, 1, mockFiltersData))
    } catch (error) {
        yield put(A.getPageFail());
    }
}

export function* applyFiltersWorker() {
    yield put(A.getPageRequest(1));
}

export function* offersListingWatcher() {
    yield all([
        takeEvery(C.OffersListingActionType.GetPageRequest, getPageWorker),
        takeEvery([C.OffersListingActionType.ApplyFilters, C.OffersListingActionType.SetType], applyFiltersWorker),
    ]);
};
