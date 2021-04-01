import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootSaga from './rootSaga';
import testReducer from './test/reducers';
import offersListingReducer from './offersListing/reducers';

const makeStore = () => {
    const saga: SagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: {
            test: testReducer,
            offersListing: offersListingReducer,
        },
        middleware: [...getDefaultMiddleware({ thunk: false }), saga],
    });

    (store as any).sagaTask = saga.run(rootSaga);

    return store;
}

export default makeStore;