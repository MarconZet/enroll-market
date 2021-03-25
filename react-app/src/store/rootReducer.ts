import { combineReducers } from "redux";
import testReducer from "./test/reducers";

// TODO: fill reducers object
const rootReducer = combineReducers({
    test: testReducer,
});

export default rootReducer;