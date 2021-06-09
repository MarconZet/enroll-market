import { ApplicationState } from "../applicationState";

export const isLoadingCoursesWithoutColisionSelector = (state: ApplicationState) => state.coursesSwapping.isLoading;

export const coursesWithoutColisionSelector = (state: ApplicationState) => state.coursesSwapping.courses.map(e => {
    const teacher = state.globalData.teachers.find(t => t.id === e.teacherId);

    return {
        ...e,
        teacher: {
            name: teacher?.name,
            surname: teacher?.surname,
        },
    };
});