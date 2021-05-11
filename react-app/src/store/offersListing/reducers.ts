import { AnyAction } from '@reduxjs/toolkit';
import * as C from './constants';

export const offersListingReducer = (state = C.InitialOffersListingState, action: AnyAction): C.OffersListingState => {
    switch (action.type) {
        case C.OffersListingActionType.GetPageRequest:
            return {
                ...state,
                page: action.page,
                isLoading: true,
            };
        case C.OffersListingActionType.GetPageSuccess:
            return {
                ...state,
                isLoading: false,
                offers: action.offers,
                totalPages: action.totalPages,
            };
        case C.OffersListingActionType.GetPageFail:
            return {
                ...state,
                isLoading: false,
            };
        case C.OffersListingActionType.ApplyFilters:
            return {
                ...state,
                filters: action.filters,
            };
        case C.OffersListingActionType.SetType:
            return {
                ...state,
                type: action.listingType,
            };
        default:
            return state;
    }
};

export default offersListingReducer;
