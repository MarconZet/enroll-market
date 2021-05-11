import { AnyAction } from '@reduxjs/toolkit';
import { GlobalDataActionType } from '../globalData/constants';
import * as C from './constants';

export const userAuthReducer = (state = C.InitialUserAuthState, action: AnyAction): C.UserAuthState => {
    switch (action.type) {
        case GlobalDataActionType.GetGlobalDataSuccess:
            return {
                ...state,
                ...action.myData,
            };
        default:
            return state;
    }
};

export default userAuthReducer;