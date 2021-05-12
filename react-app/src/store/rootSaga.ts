import { all, fork } from 'redux-saga/effects';
import { dataUploadAndDownloadWatcher } from './dataUploadAndDownload/sagas';
import { globalDataWatcher } from './globalData/sagas';
import { offersListingWatcher } from './offersListing/sagas';
import { offersManagementWatcher } from './offersManagement/sagas';
import { userDataWatcher } from './userAuth/sagas';

function* rootSaga() {
    yield all([
        fork(offersListingWatcher),
        fork(offersManagementWatcher),
        fork(dataUploadAndDownloadWatcher),
        fork(globalDataWatcher),
        fork(userDataWatcher),
    ]);
}

export default rootSaga;