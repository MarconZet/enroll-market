export enum OffersManagementActionType {
    CreateOfferRequest = 'offersManagement/CREATE_OFFER_REQUEST',
    CreateOfferSuccess = 'offersManagement/CREATE_OFFER_SUCCESS',
    CreateOfferFail = 'offersManagement/CREATE_OFFER_FAIL',
    DeleteOfferRequest = 'offersManagement/DELETE_OFFER_REQUEST',
    DeleteOfferSuccess = 'offersManagement/DELETE_OFFER_SUCCESS',
    DeleteOfferFail = 'offersManagement/DELETE_OFFER_FAIL',
};

export type OffersManagementAction = {
    type: OffersManagementActionType.CreateOfferRequest,
    givenCourseId: number;
    takenCourseId: number;
} | {
    type: OffersManagementActionType.CreateOfferSuccess,
} | {
    type: OffersManagementActionType.CreateOfferFail,
} | {
    type: OffersManagementActionType.DeleteOfferRequest,
    id: number;
} | {
    type: OffersManagementActionType.DeleteOfferSuccess,
} | {
    type: OffersManagementActionType.DeleteOfferFail,
};