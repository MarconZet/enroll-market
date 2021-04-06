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
    offers: Offer[];
    totalPages: number;
    filtersData: FiltersData;
} | {
    type: OffersListingActionType.GetPageFail,
} | {
    type: OffersListingActionType.ApplyFilters,
    filters: Filters,
} | {
    type: OffersListingActionType.SetType,
    listingType: ListingType,
};

export interface Offer {
    id: number;
    subjectName: string;
    wantedGroup: {
        teacherName: string;
        timeSlot: string;
    };
    offeredGroup: {
        teacherName: string;
        timeSlot: string;
        comment: string;
        whoOffers: string;
    },
    offerentId: string;
}

export interface FiltersData {
    timeSlots?: string[],
    subjectsList?: string[],
}

export interface Filters {
    subject: string;
    offeredSlot: string;
    wantedSlot: string;
}

export type ListingType = 'all' | 'madeByMe' | 'acceptedByMe';
export interface OffersListingState {
    page: number;
    totalPages: number;
    offers: Offer[];
    isLoading: boolean;
    filters?: Filters;
    filtersData: FiltersData;
    type: ListingType;
};

export const InitialOffersListingState: OffersListingState = {
    page: 1,
    totalPages: 1,
    offers: [],
    isLoading: false,
    filters: undefined,
    filtersData: {
        timeSlots: undefined,
        subjectsList: undefined,
    },
    type: 'all',
};