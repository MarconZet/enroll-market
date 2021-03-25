// TODO: contents of this directory to remove soon, it's only example

export enum TestActionType {
    TestRequest = 'test/TEST_REQUEST',
    TestSuccess = 'test/TEST_SUCCESS',
    TestFail = 'test/TEST_FAIL',
};

export type TestAction = {
    type: TestActionType.TestRequest,
} | {
    type: TestActionType.TestSuccess,
} | {
    type: TestActionType.TestFail,
};

export interface TestState {
    testing: boolean,
    success: boolean,
};

export const InitialTestState: TestState = {
    testing: false,
    success: false,
};
