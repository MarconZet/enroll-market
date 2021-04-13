export enum OffersManagementActionType {
    DeleteOfferRequest = 'offersManagement/DELETE_OFFER_REQUEST',
    DeleteOfferSuccess = 'offersManagement/DELETE_OFFER_SUCCESS',
    DeleteOfferFail = 'offersManagement/DELETE_OFFER_FAIL',
};

export type OffersManagementAction = {
    type: OffersManagementActionType.DeleteOfferRequest,
    id: number;
} | {
    type: OffersManagementActionType.DeleteOfferSuccess,
} | {
    type: OffersManagementActionType.DeleteOfferFail,
};