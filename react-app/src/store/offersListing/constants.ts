export enum OffersListingActionType {
    ChangePage = 'offersListing/CHANGE_PAGE',
};

export type OffersListingAction = {
    type: OffersListingActionType.ChangePage,
    page: number;
};

export interface OffersListingState {
    page: number;
    totalPages: number;
};

export const InitialOffersListingState: OffersListingState = {
    page: 1,
    totalPages: 10,
};