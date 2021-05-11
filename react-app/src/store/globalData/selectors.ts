import { CourseType } from "../../api/models";
import { ApplicationState } from "../applicationState";

export const subjectsNamesAndIdsSelector = (state: ApplicationState) => state.globalData.subjects.map((e) => ({
    id: e.id,
    name: e.name,
}));

export const coursesForSubjectAndTypeSelector = (subjectId: number, type: CourseType | "none") => (state: ApplicationState) => {
    if (subjectId === -1 || type === "none") {
        return [];
    }

    const subject = state.globalData.subjects.find((e) => e.id === subjectId);
    const courses = subject?.courses.filter(e => e.courseType === type);

    const data = courses?.map(e => {
        const teacher = state.globalData.teachers.find(t => t.id === e.teacherId);

        return {
            ...e,
            teacher: {
                name: teacher?.name,
                surname: teacher?.surname,
            },
        };
    })

    return data || [];
};

export const isLoadingGlobalDataSelector = (state: ApplicationState) => state.globalData.isLoading;

export const myCoursesSelector = (state: ApplicationState) => state.globalData.myCourses;
