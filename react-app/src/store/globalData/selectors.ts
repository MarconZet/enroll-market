import { CourseType } from "../../api/models";
import { ApplicationState } from "../applicationState";

export const subjectsNamesAndIdsSelector = (state: ApplicationState) => state.globalData.subjects.map((e) => ({
    id: e.id,
    name: e.name,
}));

export const mySubjectsNamesAndIdsSelector = (state: ApplicationState) => {
    const data = state.globalData.myCourses.map((e) => ({
        id: e.subject.id,
        name: e.subject.name,
    }));

    return data.filter((item, index) => data.findIndex(e => e.id === item.id) === index);
}

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

export const teachersNamesForSubjectAndTypeSelector = (subjectId: number, type: CourseType | "none") => (state: ApplicationState) => {
    if (subjectId === -1 || type === "none") {
        return {};
    }

    const teacherIds = state.globalData.subjects.find((e) => e.id === subjectId)?.courses.filter(c => c.courseType === type).map(c => c.teacherId);

    if (!teacherIds?.length) {
        return {};
    }

    let teachersMap: { [key: string]: string } = {};

    const teachers = state.globalData.teachers.filter(t => teacherIds.some(id => id === t.id));

    for (let i = 0; i < teachers.length; i++) {
        teachersMap[`${teachers[i].id}`] = `${teachers[i].name} ${teachers[i].surname}`;
    }

    return teachersMap;
};

export const myCousesForSubjectAndTypeSelector = (subjectId: number, type: CourseType | "none") => (state: ApplicationState) => {
    if (subjectId === -1 || type === "none") {
        return [];
    }

    const data = state.globalData?.myCourses.filter(c => (c.subject.id === subjectId) && (c.courseType === type)).map(e => ({
        ...e,
        teacherId: e.teacher.id,
    }));

    return data || [];
};

export const myCoursesSelector = (state: ApplicationState) => state.globalData.myCourses;

export const teachersSelector = (state: ApplicationState) => state.globalData.teachers;

export const coursesForSubjectSelector = (subjectId: number) => (state: ApplicationState) => state.globalData.subjects.find(e => e.id === subjectId)?.courses;
