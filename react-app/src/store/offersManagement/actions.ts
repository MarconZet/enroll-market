import { TimeBlock } from "../../api/models";
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

export const createOfferRequest = (givenCourseId: number, teacherIds: number[], timeBlocks: TimeBlock[]): OffersManagementAction => ({
    type: OffersManagementActionType.CreateOfferRequest,
    givenCourseId,
    teacherIds,
    timeBlocks,
});

export const createOneForOneOfferRequest = (givenCourseId: number, takenCourseId: number): OffersManagementAction => ({
    type: OffersManagementActionType.CreateOneForOneOfferRequest,
    givenCourseId,
    takenCourseId,
});

export const createOfferSuccess = (): OffersManagementAction => ({
    type: OffersManagementActionType.CreateOfferSuccess,
});

export const createOfferFail = (): OffersManagementAction => ({
    type: OffersManagementActionType.CreateOfferFail,
});