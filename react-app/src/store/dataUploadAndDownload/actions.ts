import { DataUploadAndDownloadAction, DataUploadAndDownloadActionType } from "./constants";

export const uploadDataRequest = (file: File, filename: string): DataUploadAndDownloadAction => ({
    type: DataUploadAndDownloadActionType.UploadDataRequest,
    file,
    filename,
});

export const uploadDataSuccess = (): DataUploadAndDownloadAction => ({
    type: DataUploadAndDownloadActionType.UploadDataSuccess,
});

export const uploadDataFail = (): DataUploadAndDownloadAction => ({
    type: DataUploadAndDownloadActionType.UploadDataFail,
});

export const registerStudentsRequest = (file: File, filename: string): DataUploadAndDownloadAction => ({
    type: DataUploadAndDownloadActionType.RegisterStudentsRequest,
    file,
    filename,
});

export const registerStudentsSuccess = (): DataUploadAndDownloadAction => ({
    type: DataUploadAndDownloadActionType.RegisterStudentsSuccess,
});

export const registerStudentsFail = (): DataUploadAndDownloadAction => ({
    type: DataUploadAndDownloadActionType.RegisterStudentsFail,
});

export const deleteStudentsRequest = (): DataUploadAndDownloadAction => ({
    type: DataUploadAndDownloadActionType.DeleteStudentsRequest,
});

export const deleteStudentsSuccess = (): DataUploadAndDownloadAction => ({
    type: DataUploadAndDownloadActionType.DeleteStudentsSuccess,
});

export const deleteStudentsFail = (): DataUploadAndDownloadAction => ({
    type: DataUploadAndDownloadActionType.DeleteStudentsFail,
});