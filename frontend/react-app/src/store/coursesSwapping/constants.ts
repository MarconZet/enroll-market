import { CourseWithoutSubject } from "../../api/models";

export enum CoursesSwappingActionType {
    SwapCoursesRequest = 'coursesSwapping/SWAP_COURSES_REQUEST',
    SwapCoursesSuccess = 'coursesSwapping/SWAP_COURSES_SUCCESS',
    SwapCoursesFail = 'coursesSwapping/SWAP_COURSES_FAIL',
    CoursesWithoutColisionRequest = 'coursesSwapping/COURSES_WITHOUT_COLISION_REQUEST',
    CoursesWithoutColisionSuccess = 'coursesSwapping/COURSES_WITHOUT_COLISION_SUCCESS',
    CoursesWithoutColisionFail = 'coursesSwapping/COURSES_WITHOUT_COLISION_FAIL',
};

export type CoursesSwappingAction = {
    type: CoursesSwappingActionType.SwapCoursesRequest,
    from: number,
    to: number,
} | {
    type: CoursesSwappingActionType.SwapCoursesSuccess,
} | {
    type: CoursesSwappingActionType.SwapCoursesFail,
} | {
    type: CoursesSwappingActionType.CoursesWithoutColisionRequest,
    courseId: number,
    subjectId: number,
} | {
    type: CoursesSwappingActionType.CoursesWithoutColisionSuccess,
    courses: CourseWithoutSubject[];
} | {
    type: CoursesSwappingActionType.CoursesWithoutColisionFail,
};

export interface CoursesSwappingState {
    isLoading: boolean;
    courses: CourseWithoutSubject[];
}

export const InitialCoursesSwappingState: CoursesSwappingState = {
    isLoading: false,
    courses: [],
}