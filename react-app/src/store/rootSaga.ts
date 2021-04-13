import { all, fork } from 'redux-saga/effects';
import { offersListingWatcher } from './offersListing/sagas';
import { offersManagementWatcher } from './offersManagement/sagas';

function* rootSaga() {
    yield all([
        fork(offersListingWatcher),
        fork(offersManagementWatcher),
    ]);
}

export default rootSaga;