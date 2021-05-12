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
    startTime: string;
    teacherId: number;
    weekType?: string;
}

export interface Course {
    subject: SubjectShort;
    courseType: CourseType;
    dayOfWeek: DayOfWeek;
    id: number;
    startTime: string;
    teacher: Teacher;
    weekType?: string;
}

export interface Subject extends SubjectShort {
    courses: CourseWithoutSubject[];
}

export interface Student {
    id: number;
    name: string;
    surname: string;
    indexNumber: string;
}

export interface StudentWithCourses extends Student {
    coursesIds: number[];
}

export interface OneForOneOffer {
    givenCourse: Course;
    id: number;
    student: Student;
    takenCourse: Course;
}

export interface OneForOneOfferParams {
    givenCourseId: number;
    takenCourseId: number;
}

export interface TimeBlock {
    startTime: string;
    endTime: string;
    id?: number;
    dayOfWeek: DayOfWeek;
}

export interface OfferConditions {
    id: number;
    teachers: Teacher[];
    timeBlocks: TimeBlock[];
}

export interface Offer {
    givenCourse: Course;
    id: number;
    student: Student;
    isOneToOne: boolean;
    offerConditions: OfferConditions;
}

export interface OfferParams {
    givenCourseId: number;
    teacherIds: number[];
    timeBlocks: TimeBlock[];
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

export interface OffersQueryParams extends BasicQueryParams {
    search?: string;
}
