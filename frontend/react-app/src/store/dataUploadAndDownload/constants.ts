export enum DataUploadAndDownloadActionType {
    UploadDataRequest = 'dataUploadAndDownload/UPLOAD_DATA_REQUEST',
    UploadDataSuccess = 'dataUploadAndDownload/UPLOAD_DATA_SUCCESS',
    UploadDataFail = 'dataUploadAndDownload/UPLOAD_DATA_FAIL',
    RegisterStudentsRequest = 'dataUploadAndDownload/REGISTER_STUDENTS_REQUEST',
    RegisterStudentsSuccess = 'dataUploadAndDownload/REGISTER_STUDENTS_SUCCESS',
    RegisterStudentsFail = 'dataUploadAndDownload/REGISTER_STUDENTS_FAIL',
    DeleteStudentsRequest = 'dataUploadAndDownload/DELETE_STUDENTS_REQUEST',
    DeleteStudentsSuccess = 'dataUploadAndDownload/DELETE_STUDENTS_SUCCESS',
    DeleteStudentsFail = 'dataUploadAndDownload/DELETE_STUDENTS_FAIL',
};

export type DataUploadAndDownloadAction = {
    type: DataUploadAndDownloadActionType.UploadDataRequest,
    file: File;
    filename: string;
} | {
    type: DataUploadAndDownloadActionType.UploadDataSuccess,
} | {
    type: DataUploadAndDownloadActionType.UploadDataFail,
} | {
    type: DataUploadAndDownloadActionType.RegisterStudentsRequest,
    file: File;
    filename: string;
} | {
    type: DataUploadAndDownloadActionType.RegisterStudentsSuccess,
} | {
    type: DataUploadAndDownloadActionType.RegisterStudentsFail,
} | {
    type: DataUploadAndDownloadActionType.DeleteStudentsRequest,
} | {
    type: DataUploadAndDownloadActionType.DeleteStudentsSuccess,
} | {
    type: DataUploadAndDownloadActionType.DeleteStudentsFail,
};