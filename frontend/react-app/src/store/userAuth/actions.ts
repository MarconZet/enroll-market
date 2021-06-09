import { StudentWithCourses } from "../../api/models";
import { UserAuthAction, UserAuthActionType } from "./constants";

export const getUserDataRequest = (): UserAuthAction => ({
    type: UserAuthActionType.GetUserDataRequest,
});

export const getUserDataSuccess = (myData: StudentWithCourses): UserAuthAction => ({
    type: UserAuthActionType.GetUserDataSuccess,
    myData,
});

export const getUserDataFail = (): UserAuthAction => ({
    type: UserAuthActionType.GetUserDataFail,
});