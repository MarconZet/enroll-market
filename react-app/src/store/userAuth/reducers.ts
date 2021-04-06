import { AnyAction } from '@reduxjs/toolkit';
import * as C from './constants';

export const userAuthReducer = (state = C.InitialUserAuthState, action: AnyAction): C.UserAuthState => {
    switch (action.type) {
        default:
            return state;
    }
};

export default userAuthReducer;