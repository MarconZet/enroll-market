import * as C from './constants';

export const testReducer = (state = C.InitialTestState, action: C.TestAction): C.TestState => {
    switch (action.type) {
        case C.TestActionType.TestRequest:
            return {
                ...state,
                testing: true,
            };
        case C.TestActionType.TestSuccess:
            return {
                testing: false,
                success: true,
            };
        case C.TestActionType.TestFail:
            return C.InitialTestState;
        default:
            return state;
    }
};

export default testReducer;
