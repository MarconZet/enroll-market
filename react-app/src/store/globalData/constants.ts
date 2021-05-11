import { Course, StudentWithCourses, Subject, Teacher } from "../../api/models";

export enum GlobalDataActionType {
    GetGlobalDataRequest = 'globalData/GET_GLOBAL_DATA_REQUEST',
    GetGlobalDataSuccess = 'globalData/GET_GLOBAL_DATA_SUCCESS',
    GetGlobalDataFail = 'globalData/GET_GLOBAL_DATA_FAIL',
};

export type GlobalDataAction = {
    type: GlobalDataActionType.GetGlobalDataRequest,
} | {
    type: GlobalDataActionType.GetGlobalDataSuccess,
    subjects: Subject[];
    teachers: Teacher[];
    myData: StudentWithCourses | {};
    myCourses: Course[];
} | {
    type: GlobalDataActionType.GetGlobalDataFail,
};

export interface GlobalDataState {
    subjects: Subject[];
    teachers: Teacher[];
    myCourses: Course[];
    isLoading: boolean;
}

export const GlobalDataIinitialState: GlobalDataState = {
    subjects: [],
    teachers: [],
    myCourses: [],
    isLoading: false,
};
