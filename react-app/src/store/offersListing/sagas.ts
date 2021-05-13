import { AnyAction } from 'redux';
import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import { canAcceptOffer, getMatchingOffers, getOffers, getOneForOneOffer } from '../../api/requests';
import * as A from './actions';
import * as C from './constants'
import notitier from '../../utils/notifications';
import { OffersManagementActionType } from '../offersManagement/constants';
import { OffersQueryParams } from '../../api/models';
import { offersListingFiltersSelector } from './selectors';

export function* getPageWorker(action: AnyAction) {
    try {
        const queryParams: OffersQueryParams = {};

        if (!!action.page && action.page > 1) {
            queryParams.pageNo = action.page - 1;
        }

        const search: string = yield select(offersListingFiltersSelector);

        if (!!search?.length) {
            queryParams.search = search;
        }

        const { data: { content, totalPages } } = yield call(getOffers, (queryParams !== {} ? queryParams : undefined));

        const extendedContent: C.ExtendedOffer[] = [];

        for (let i = 0; i < content.length; i++) {
            const extendedOffer: C.ExtendedOffer = content[i];

            const { data: canAccept } = yield call(canAcceptOffer, extendedOffer.id);
            extendedOffer.canAccept = canAccept;

            if (canAccept) {
                const { data: matchingCourses } = yield call(getMatchingOffers, extendedOffer.id);
                extendedOffer.matchingCourses = matchingCourses;
            }

            if (extendedOffer.isOneToOne) {
                const { data: oneForOneOffer } = yield call(getOneForOneOffer, extendedOffer.id);
                extendedOffer.takenCourse = oneForOneOffer.takenCourse;
            }

            extendedContent.push(extendedOffer);
        }

        yield put(A.getPageSuccess(extendedContent, totalPages < 1 ? 1 : totalPages));
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
