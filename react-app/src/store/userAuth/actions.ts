import { StudentWithCourses } from "../../api/models";
import { UserAuthAction, UserAuthActionType } from "./constants";

export const getUserDataRequest = (token: string): UserAuthAction => ({
    type: UserAuthActionType.GetUserDataRequest,
    token,
});

export const getUserDataSuccess = (myData: StudentWithCourses): UserAuthAction => ({
    type: UserAuthActionType.GetUserDataSuccess,
    myData,
});

export const getUserDataFail = (): UserAuthAction => ({
    type: UserAuthActionType.GetUserDataFail,
});