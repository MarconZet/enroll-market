import { AnyAction } from '@reduxjs/toolkit';
import * as C from './constants';

export const coursesSwappingReducer = (state = C.InitialCoursesSwappingState, action: AnyAction): C.CoursesSwappingState => {
    switch (action.type) {
        case C.CoursesSwappingActionType.CoursesWithoutColisionRequest:
            return {
                ...state,
                isLoading: true,
            };
        case C.CoursesSwappingActionType.CoursesWithoutColisionSuccess:
            return {
                ...state,
                isLoading: false,
                courses: action.courses,
            };
        case C.CoursesSwappingActionType.CoursesWithoutColisionFail:
            return {
                ...state,
                isLoading: false,
                courses: [],
            };
        default:
            return state;
    }
};

export default coursesSwappingReducer;