import { put, takeEvery, all } from 'redux-saga/effects';
import * as A from './actions';
import * as C from './constants'
import { mockOffers, mockFiltersData } from './mockData';

// TODO: this workers are temporarily mocks; update when api will be available

export function* getPageWorker(action: C.OffersListingAction) {
    try {
        yield put(A.getPageSuccess(mockOffers, 10, mockFiltersData))
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
        takeEvery(C.OffersListingActionType.ApplyFilters, applyFiltersWorker),
    ]);
};
