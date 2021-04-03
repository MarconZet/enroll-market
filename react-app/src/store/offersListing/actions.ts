import { OffersListingAction, OffersListingActionType, FiltersData, Offer, Filters } from './constants';

export const getPageRequest = (page: number): OffersListingAction => ({
    type: OffersListingActionType.GetPageRequest,
    page,
});

export const getPageSuccess = (offers: Offer[], totalPages: number, filtersData: FiltersData): OffersListingAction => ({
    type: OffersListingActionType.GetPageSuccess,
    offers,
    totalPages,
    filtersData,
});

export const getPageFail = (): OffersListingAction => ({
    type: OffersListingActionType.GetPageFail,
});

export const applyFilters = (filters: Filters): OffersListingAction => ({
    type: OffersListingActionType.ApplyFilters,
    filters,
});
