import { OffersListingAction, OffersListingActionType, ExtendedOffer, ListingType } from './constants';

export const getPageRequest = (page: number): OffersListingAction => ({
    type: OffersListingActionType.GetPageRequest,
    page,
});

export const getPageSuccess = (offers: ExtendedOffer[], totalPages: number): OffersListingAction => ({
    type: OffersListingActionType.GetPageSuccess,
    offers,
    totalPages,
});

export const getPageFail = (): OffersListingAction => ({
    type: OffersListingActionType.GetPageFail,
});

export const applyFilters = (filters: string): OffersListingAction => ({
    type: OffersListingActionType.ApplyFilters,
    filters,
});

export const setType = (listingType: ListingType): OffersListingAction => ({
    type: OffersListingActionType.SetType,
    listingType,
});
