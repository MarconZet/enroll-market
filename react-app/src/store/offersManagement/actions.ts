import { OffersManagementAction, OffersManagementActionType } from "./constants";

export const deleteOfferRequest = (id: number): OffersManagementAction => ({
    type: OffersManagementActionType.DeleteOfferRequest,
    id,
});

export const deleteOfferSuccess = (): OffersManagementAction => ({
    type: OffersManagementActionType.DeleteOfferSuccess,
});

export const deleteOfferFail = (): OffersManagementAction => ({
    type: OffersManagementActionType.DeleteOfferFail,
});

export const createOfferRequest = (givenCourseId: number, takenCourseId: number): OffersManagementAction => ({
    type: OffersManagementActionType.CreateOfferRequest,
    givenCourseId,
    takenCourseId,
});

export const createOfferSuccess = (): OffersManagementAction => ({
    type: OffersManagementActionType.CreateOfferSuccess,
});

export const createOfferFail = (): OffersManagementAction => ({
    type: OffersManagementActionType.CreateOfferFail,
});