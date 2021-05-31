import { AnyAction } from "redux";
import { call, all, takeEvery, put } from "redux-saga/effects";
import * as C from './constants';
import * as A from './actions';
import notitier from '../../utils/notifications';
import { changeCourse } from "../../api/requests";

export function* swapCoursesWorker(action: AnyAction) {
    try {
        yield call(changeCourse, action.from, action.to);
        yield put(A.swapCoursesSuccess());
        notitier.success('Przepisanie powiodło się.');
    } catch (error) {
        yield put(A.swapCoursesFail());
        notitier.alert('Przepisanie nie powiodło się.');
    }
}

export function* coursesSwappingWatcher() {
    yield all([
        takeEvery(C.CoursesSwappingActionType.SwapCoursesRequest, swapCoursesWorker),
    ]);
};