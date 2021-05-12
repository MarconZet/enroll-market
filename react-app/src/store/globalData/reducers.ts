import { AnyAction } from '@reduxjs/toolkit';
import * as C from './constants';

export const globalDataReducer = (state = C.GlobalDataIinitialState, action: AnyAction): C.GlobalDataState => {
    switch (action.type) {
        case C.GlobalDataActionType.GetGlobalDataRequest:
            return {
                ...state,
                isLoading: true,
            };
        case C.GlobalDataActionType.GetGlobalDataSuccess:
            return {
                ...state,
                subjects: action.subjects,
                teachers: action.teachers,
                isLoading: false,
            };
        case C.GlobalDataActionType.GetGlobalDataFail:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default globalDataReducer;