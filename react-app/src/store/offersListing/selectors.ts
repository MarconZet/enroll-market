import { ApplicationState } from "../applicationState";

export const offersListingPageSelector = (state: ApplicationState) => state.offersListing.page;

export const offersListingTotalPagesSelector = (state: ApplicationState) => state.offersListing.totalPages;

export const offersListingSelector = (state: ApplicationState) => state.offersListing.offers;

export const offersListingFiltersSelector = (state: ApplicationState) => state.offersListing.filters;

export const offersListingFiltersDataSelector = (state: ApplicationState) => state.offersListing.filtersData;

export const offersListingIsLoadingSelector = (state: ApplicationState) => state.offersListing.isLoading;
