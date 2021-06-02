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

export const createOfferRequest = (givenCourseId: number, teacherIds: number[], timeBlocks: TimeBlock[], comment: string): OffersManagementAction => ({
    type: OffersManagementActionType.CreateOfferRequest,
    givenCourseId,
    teacherIds,
    timeBlocks,
    comment,
});

export const createOneForOneOfferRequest = (givenCourseId: number, takenCourseId: number, comment: string): OffersManagementAction => ({
    type: OffersManagementActionType.CreateOneForOneOfferRequest,
    givenCourseId,
    takenCourseId,
    comment,
});

export const createOfferSuccess = (): OffersManagementAction => ({
    type: OffersManagementActionType.CreateOfferSuccess,
});

export const createOfferFail = (): OffersManagementAction => ({
    type: OffersManagementActionType.CreateOfferFail,
});

export const acceptOfferRequest = (offerId: number, courseId: number): OffersManagementAction => ({
    type: OffersManagementActionType.AcceptOfferRequest,
    offerId,
    courseId,
});

export const acceptOfferSuccess = (): OffersManagementAction => ({
    type: OffersManagementActionType.AcceptOfferSuccess,
});

export const acceptOfferFail = (): OffersManagementAction => ({
    type: OffersManagementActionType.AcceptOfferFail,
});

export const editOfferRequest = (id: number, givenCourseId: number, teacherIds: number[], timeBlocks: TimeBlock[], comment: string): OffersManagementAction => ({
    type: OffersManagementActionType.EditOfferRequest,
    givenCourseId,
    teacherIds,
    timeBlocks,
    comment,
    id,
});

export const editOneForOneOfferRequest = (id:number, givenCourseId: number, takenCourseId: number, comment: string): OffersManagementAction => ({
    type: OffersManagementActionType.EditOneForOneOfferRequest,
    givenCourseId,
    takenCourseId,
    comment,
    id,
});

export const editOfferSuccess = (): OffersManagementAction => ({
    type: OffersManagementActionType.EditOfferSuccess,
});

export const editOfferFail = (): OffersManagementAction => ({
    type: OffersManagementActionType.EditOfferFail,
});