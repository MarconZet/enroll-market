import { TimeBlock } from "../../api/models";

export enum OffersManagementActionType {
    CreateOfferRequest = 'offersManagement/CREATE_OFFER_REQUEST',
    CreateOneForOneOfferRequest = 'offersManagement/CREATE_ONE_FOR_ONE_OFFER_REQUEST',
    CreateOfferSuccess = 'offersManagement/CREATE_OFFER_SUCCESS',
    CreateOfferFail = 'offersManagement/CREATE_OFFER_FAIL',
    DeleteOfferRequest = 'offersManagement/DELETE_OFFER_REQUEST',
    DeleteOfferSuccess = 'offersManagement/DELETE_OFFER_SUCCESS',
    DeleteOfferFail = 'offersManagement/DELETE_OFFER_FAIL',
};

export type OffersManagementAction = {
    type: OffersManagementActionType.CreateOfferRequest,
    givenCourseId: number;
    teacherIds: number[];
    timeBlocks: TimeBlock[];
} | {
    type: OffersManagementActionType.CreateOneForOneOfferRequest,
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