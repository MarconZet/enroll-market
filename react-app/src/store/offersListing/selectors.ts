import { ApplicationState } from "../applicationState";

export const OffersListingPageSelector = (state: ApplicationState) => state.offersListing.page;

export const OffersListingTotalPagesSelector = (state: ApplicationState) => state.offersListing.totalPages;
