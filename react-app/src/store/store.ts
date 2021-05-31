import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootSaga from './rootSaga';
import offersListingReducer from './offersListing/reducers';
import userAuthReducer from './userAuth/reducers';
import { DataUploadAndDownloadActionType } from './dataUploadAndDownload/constants';
import globalDataReducer from './globalData/reducers';
import coursesSwappingReducer from './coursesSwapping/reducers';

const makeStore = () => {
    const saga: SagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: {
            offersListing: offersListingReducer,
            userAuth: userAuthReducer,
            globalData: globalDataReducer,
            coursesSwapping: coursesSwappingReducer,
        },
        middleware: [...getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: [DataUploadAndDownloadActionType.UploadDataRequest],
            },
        }), saga],
    });

    (store as any).sagaTask = saga.run(rootSaga);

    return store;
}

export default makeStore;