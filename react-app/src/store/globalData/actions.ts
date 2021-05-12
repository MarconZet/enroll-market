import { Subject, Teacher } from "../../api/models";
import { GlobalDataAction, GlobalDataActionType } from "./constants";

export const getGlobalDataRequest = (token: string): GlobalDataAction => ({
    type: GlobalDataActionType.GetGlobalDataRequest,
    token,
});

export const getGlobalDataSuccess = (subjects: Subject[], teachers: Teacher[]): GlobalDataAction => ({
    type: GlobalDataActionType.GetGlobalDataSuccess,
    subjects,
    teachers,
});

export const getGlobalDataFail = (): GlobalDataAction => ({
    type: GlobalDataActionType.GetGlobalDataFail,
});
