import { Course, StudentWithCourses, Subject, Teacher } from "../../api/models";
import { GlobalDataAction, GlobalDataActionType } from "./constants";

export const getGlobalDataRequest = (): GlobalDataAction => ({
    type: GlobalDataActionType.GetGlobalDataRequest,
});

export const getGlobalDataSuccess = (subjects: Subject[], teachers: Teacher[], myData: StudentWithCourses | {}, myCourses: Course[]): GlobalDataAction => ({
    type: GlobalDataActionType.GetGlobalDataSuccess,
    subjects,
    teachers,
    myData,
    myCourses,
});

export const getGlobalDataFail = (): GlobalDataAction => ({
    type: GlobalDataActionType.GetGlobalDataFail,
});
