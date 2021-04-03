import { all, fork } from 'redux-saga/effects';
import { offersListingWatcher } from './offersListing/sagas';

// TODO: fill sagas array
function* rootSaga() {
    yield all([
        fork(offersListingWatcher),
    ]);
}

export default rootSaga;