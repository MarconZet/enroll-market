import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootSaga from './rootSaga';
import offersListingReducer from './offersListing/reducers';
import userAuthReducer from './userAuth/reducers';

const makeStore = () => {
    const saga: SagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: {
            offersListing: offersListingReducer,
            userAuth: userAuthReducer,
        },
        middleware: [...getDefaultMiddleware({ thunk: false }), saga],
    });

    (store as any).sagaTask = saga.run(rootSaga);

    return store;
}

export default makeStore;