import { Subject, Teacher } from "../../api/models";
import { GlobalDataAction, GlobalDataActionType } from "./constants";

export const getGlobalDataRequest = (): GlobalDataAction => ({
    type: GlobalDataActionType.GetGlobalDataRequest,
});

export const getGlobalDataSuccess = (subjects: Subject[], teachers: Teacher[]): GlobalDataAction => ({
    type: GlobalDataActionType.GetGlobalDataSuccess,
    subjects,
    teachers,
});

export const getGlobalDataFail = (): GlobalDataAction => ({
    type: GlobalDataActionType.GetGlobalDataFail,
});
