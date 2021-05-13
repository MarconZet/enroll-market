import { StudentWithCourses } from "../../api/models";

export enum UserAuthActionType {
    GetUserDataRequest = 'userAuth/GET_USER_DATA_REQUEST',
    GetUserDataSuccess = 'userAuth/GET_USER_DATA_SUCCESS',
    GetUserDataFail = 'userAuth/GET_USER_DATA_FAIL',
};

export type UserAuthAction = {
    type: UserAuthActionType.GetUserDataRequest;
} | {
    type: UserAuthActionType.GetUserDataSuccess;
    myData: StudentWithCourses;
} | {
    type: UserAuthActionType.GetUserDataFail;
};

export interface UserAuthState {
    isLoading: boolean;
    id?: number;
    name?: string;
    surname?: string;
}

export const InitialUserAuthState: UserAuthState = {
    isLoading: false,
}