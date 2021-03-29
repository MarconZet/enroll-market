import { OffersListingAction, OffersListingActionType } from './constants';

export const changePage = (page: number): OffersListingAction => ({
    type: OffersListingActionType.ChangePage,
    page,
});
