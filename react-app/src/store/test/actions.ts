import * as C from './constants';

export const testRequest = (): C.TestAction => ({
    type: C.TestActionType.TestRequest,
});

export const testSuccess = (): C.TestAction => ({
    type: C.TestActionType.TestSuccess,
});

export const testFail = (): C.TestAction => ({
    type: C.TestActionType.TestFail,
});
