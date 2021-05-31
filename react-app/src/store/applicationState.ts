import { CoursesSwappingState } from './coursesSwapping/constants';
import { GlobalDataState } from './globalData/constants';
import { OffersListingState } from './offersListing/constants';
import { UserAuthState } from './userAuth/constants';

export interface ApplicationState {
    offersListing: OffersListingState;
    userAuth: UserAuthState;
    globalData: GlobalDataState;
    coursesSwapping: CoursesSwappingState;
};