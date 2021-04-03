export enum OffersListingActionType {
    GetPageRequest = 'offersListing/GET_PAGE_REQUEST',
    GetPageSuccess = 'offersListing/GET_PAGE_SUCCESS',
    GetPageFail = 'offersListing/GET_PAGE_FAIL',
    ApplyFilters = 'offersListing/APPLY_FILTERS',
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
};

export interface Offer {
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
    }
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
export interface OffersListingState {
    page: number;
    totalPages: number;
    offers: Offer[];
    isLoading: boolean;
    filters?: Filters;
    filtersData: FiltersData;
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
};