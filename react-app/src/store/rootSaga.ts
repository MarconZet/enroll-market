import { all, fork } from 'redux-saga/effects';
import { dataUploadAndDownloadWatcher } from './dataUploadAndDownload/sagas';
import { offersListingWatcher } from './offersListing/sagas';
import { offersManagementWatcher } from './offersManagement/sagas';

function* rootSaga() {
    yield all([
        fork(offersListingWatcher),
        fork(offersManagementWatcher),
        fork(dataUploadAndDownloadWatcher),
    ]);
}

export default rootSaga;