import { AnyAction } from 'redux';
import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import { getOneForOneOffers } from '../../api/requests';
import * as A from './actions';
import * as C from './constants'
import notitier from '../../utils/notifications';
import { OffersManagementActionType } from '../offersManagement/constants';
import { OffersQueryParams } from '../../api/models';
// import { offersListingFiltersSelector } from './selectors';

export function* getPageWorker(action: AnyAction) {
    try {
        const queryParams: OffersQueryParams = {};

        if (!!action.page) {
            queryParams.pageNo = action.page;
        }

        // const search: string = yield select(offersListingFiltersSelector);

        // if (!!search?.length) {
        //     queryParams.search = search;
        // }

        const { data: { content, totalPages } } = yield call(getOneForOneOffers, queryParams);
        yield put(A.getPageSuccess(content, totalPages < 1 ? 1 : totalPages));
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
