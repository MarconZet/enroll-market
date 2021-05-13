import { Course, Offer } from "../../api/models";

export enum OffersListingActionType {
    GetPageRequest = 'offersListing/GET_PAGE_REQUEST',
    GetPageSuccess = 'offersListing/GET_PAGE_SUCCESS',
    GetPageFail = 'offersListing/GET_PAGE_FAIL',
    ApplyFilters = 'offersListing/APPLY_FILTERS',
    SetType = 'offersListing/SET_TYPE',
};

export type OffersListingAction = {
    type: OffersListingActionType.GetPageRequest,
    page: number;
} | {
    type: OffersListingActionType.GetPageSuccess,
    offers: ExtendedOffer[];
    totalPages: number;
} | {
    type: OffersListingActionType.GetPageFail,
} | {
    type: OffersListingActionType.ApplyFilters,
    filters: string,
} | {
    type: OffersListingActionType.SetType,
    listingType: ListingType,
};

// export interface Offer {
//     id: number;
//     subjectName: string;
//     wantedGroup: {
//         teacherName: string;
//         timeSlot: string;
//     };
//     offeredGroup: {
//         teacherName: string;
//         timeSlot: string;
//         comment: string;
//         whoOffers: string;
//     },
//     offerentId: string;
// }

export interface ExtendedOffer extends Offer {
    takenCourse?: Course;
    matchingCourses?: Course[];
    canAccept: boolean;
} 

export type ListingType = 'all' | 'madeByMe' | 'acceptedByMe';
export interface OffersListingState {
    page: number;
    totalPages: number;
    offers: ExtendedOffer[];
    isLoading: boolean;
    filters?: string;
    type: ListingType;
};

export const InitialOffersListingState: OffersListingState = {
    page: 1,
    totalPages: 1,
    offers: [],
    isLoading: false,
    filters: undefined,
    type: 'all',
};