import { CourseWithoutSubject } from "../../api/models";
import { CoursesSwappingAction, CoursesSwappingActionType } from "./constants";

export const swapCoursesRequest = (from: number, to: number): CoursesSwappingAction => ({
    type: CoursesSwappingActionType.SwapCoursesRequest,
    from,
    to,
});

export const swapCoursesSuccess = (): CoursesSwappingAction => ({
    type: CoursesSwappingActionType.SwapCoursesSuccess,
});

export const swapCoursesFail = (): CoursesSwappingAction => ({
    type: CoursesSwappingActionType.SwapCoursesFail,
});

export const coursesWithoutColisionRequest = (courseId: number, subjectId: number): CoursesSwappingAction => ({
    type: CoursesSwappingActionType.CoursesWithoutColisionRequest,
    courseId,
    subjectId,
});

export const coursesWithoutColisionSuccess = (courses: CourseWithoutSubject[]): CoursesSwappingAction => ({
    type: CoursesSwappingActionType.CoursesWithoutColisionSuccess,
    courses,
});

export const coursesWithoutColisionFail = (): CoursesSwappingAction => ({
    type: CoursesSwappingActionType.CoursesWithoutColisionFail,
});