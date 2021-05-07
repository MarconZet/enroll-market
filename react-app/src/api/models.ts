export interface SubjectShort {
    id: number;
    name: string;
}

export interface Teacher {
    emailAddress: string;
    id: number;
    name: string;
    surname: string;
}

export enum CourseType {
    PROJECT = 'PROJECT',
    LABORATORY = 'LABORATORY',
    LECTURE = 'LECTURE',
    LESSON = 'LESSON',
}

export enum DayOfWeek {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY',
}

export interface Time {
    hour: number;
    minute: number;
    second: number;
    nano: number;
}

export interface CourseWithoutSubject {
    courseType: CourseType;
    dayOfWeek: DayOfWeek;
    id: number;
    startTime: Time;
    teacherId: number
}

export interface Course {
    subject: SubjectShort;
    courseType: CourseType;
    dayOfWeek: DayOfWeek;
    id: number;
    startTime: Time;
    teacher: Teacher;
}

export interface Subject extends SubjectShort {
    courses: CourseWithoutSubject[];
}

export interface Student {
    admin: boolean;
    id: number;
    name: string;
    surname: string;
}

export interface OneForOneOffer {
    givenCourse: Course;
    id: number;
    student: Student;
    takenCourse: Course;
}

export interface OneForOneOfferParams {
    givenCourseId: number;
    studentId: number;
    takenCourseId: number;
}

export interface PaginatedResponse<T> {
    content: T;
    totalPages: number;
    pageable: {
        pageNumber: number;
    }
}

export interface BasicQueryParams {
    pageNo?: number;
    pageSize?: number;
}