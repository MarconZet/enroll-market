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
