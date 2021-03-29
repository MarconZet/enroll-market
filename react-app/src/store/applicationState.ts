import { TestState } from "./test/constants";
import { OffersListingState } from './offersListing/constants';

export interface ApplicationState {
    test: TestState,
    offersListing: OffersListingState,
};