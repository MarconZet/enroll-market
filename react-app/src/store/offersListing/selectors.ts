import { ApplicationState } from "../applicationState";

export const offersListingPageSelector = (state: ApplicationState) => state.offersListing.page;

export const offersListingTotalPagesSelector = (state: ApplicationState) => state.offersListing.totalPages;

export const offersListingSelector = (state: ApplicationState) => state.offersListing.offers;

export const offersListingFiltersSelector = (state: ApplicationState) => state.offersListing.filters;

export const offersListingIsLoadingSelector = (state: ApplicationState) => state.offersListing.isLoading;

export const offersListingTypeSelector = (state: ApplicationState) => state.offersListing.type;
