export enum DataUploadAndDownloadActionType {
    UploadDataRequest = 'dataUploadAndDownload/UPLOAD_DATA_REQUEST',
    UploadDataSuccess = 'dataUploadAndDownload/UPLOAD_DATA_SUCCESS',
    UploadDataFail = 'dataUploadAndDownload/UPLOAD_DATA_FAIL',
};

export type DataUploadAndDownloadAction = {
    type: DataUploadAndDownloadActionType.UploadDataRequest,
    file: File;
    filename: string;
} | {
    type: DataUploadAndDownloadActionType.UploadDataSuccess,
} | {
    type: DataUploadAndDownloadActionType.UploadDataFail,
};