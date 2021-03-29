import { combineReducers } from "redux";
import testReducer from "./test/reducers";
import offersListingReducer from './offersListing/reducers';

// TODO: fill reducers object
const rootReducer = combineReducers({
    test: testReducer,
    offersListing: offersListingReducer,
});

export default rootReducer;