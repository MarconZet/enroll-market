import { AnyAction } from '@reduxjs/toolkit';
import * as C from './constants';

export const userAuthReducer = (state = C.InitialUserAuthState, action: AnyAction): C.UserAuthState => {
    switch (action.type) {
        case C.UserAuthActionType.GetUserDataRequest:
            return {
                ...state,
                isLoading: true,
            };
        case C.UserAuthActionType.GetUserDataSuccess:
            return {
                ...state,
                ...action.myData,
                isLoading: false,
            };
        case C.UserAuthActionType.GetUserDataFail:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default userAuthReducer;