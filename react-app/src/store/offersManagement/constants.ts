import { TimeBlock } from "../../api/models";

export enum OffersManagementActionType {
    CreateOfferRequest = 'offersManagement/CREATE_OFFER_REQUEST',
    CreateOneForOneOfferRequest = 'offersManagement/CREATE_ONE_FOR_ONE_OFFER_REQUEST',
    CreateOfferSuccess = 'offersManagement/CREATE_OFFER_SUCCESS',
    CreateOfferFail = 'offersManagement/CREATE_OFFER_FAIL',
    DeleteOfferRequest = 'offersManagement/DELETE_OFFER_REQUEST',
    DeleteOfferSuccess = 'offersManagement/DELETE_OFFER_SUCCESS',
    DeleteOfferFail = 'offersManagement/DELETE_OFFER_FAIL',
    AcceptOfferRequest = 'offersManagement/ACCEPT_OFFER_REQUEST',
    AcceptOfferSuccess = 'offersManagement/ACCEPT_OFFER_SUCCESS',
    AcceptOfferFail = 'offersManagement/ACCEPT_OFFER_FAIL',
    EditOfferRequest = 'offersManagement/EDIT_OFFER_REQUEST',
    EditOneForOneOfferRequest = 'offersManagement/EDIT_ONE_FOR_ONE_OFFER_REQUEST',
    EditOfferSuccess = 'offersManagement/EDIT_OFFER_SUCCESS',
    EditOfferFail = 'offersManagement/EDIT_OFFER_FAIL',
};

export type OffersManagementAction = {
    type: OffersManagementActionType.CreateOfferRequest,
    givenCourseId: number;
    teacherIds: number[];
    timeBlocks: TimeBlock[];
    comment: string;
} | {
    type: OffersManagementActionType.CreateOneForOneOfferRequest,
    givenCourseId: number;
    takenCourseId: number;
    comment: string;
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
} | {
    type: OffersManagementActionType.AcceptOfferRequest,
    offerId: number;
    courseId: number;
} | {
    type: OffersManagementActionType.AcceptOfferSuccess,
} | {
    type: OffersManagementActionType.AcceptOfferFail,
} | {
    type: OffersManagementActionType.EditOfferRequest,
    id: number;
    givenCourseId: number;
    teacherIds: number[];
    timeBlocks: TimeBlock[];
    comment: string;
} | {
    type: OffersManagementActionType.EditOneForOneOfferRequest,
    id: number;
    givenCourseId: number;
    takenCourseId: number;
    comment: string;
} | {
    type: OffersManagementActionType.EditOfferSuccess,
} | {
    type: OffersManagementActionType.EditOfferFail,
};