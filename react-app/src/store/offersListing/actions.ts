import { OffersListingAction, OffersListingActionType, Offer, Filters, ListingType } from './constants';

export const getPageRequest = (page: number): OffersListingAction => ({
    type: OffersListingActionType.GetPageRequest,
    page,
});

export const getPageSuccess = (offers: Offer[], totalPages: number): OffersListingAction => ({
    type: OffersListingActionType.GetPageSuccess,
    offers,
    totalPages,
});

export const getPageFail = (): OffersListingAction => ({
    type: OffersListingActionType.GetPageFail,
});

export const applyFilters = (filters: Filters): OffersListingAction => ({
    type: OffersListingActionType.ApplyFilters,
    filters,
});

export const setType = (listingType: ListingType): OffersListingAction => ({
    type: OffersListingActionType.SetType,
    listingType,
});
