import { AnyAction } from "redux";
import { call, all, takeEvery, put, select } from "redux-saga/effects";
import * as C from './constants';
import * as A from './actions';
import notitier from '../../utils/notifications';
import { changeCourse, getCoursesWithoutColision } from "../../api/requests";
import { coursesForSubjectSelector } from "../globalData/selectors";
import { CourseWithoutSubject } from "../../api/models";
import { getGlobalDataRequest } from "../globalData/actions";

export function* swapCoursesWorker(action: AnyAction) {
    try {
        yield call(changeCourse, action.from, action.to);
        yield put(A.swapCoursesSuccess());
        notitier.success('Przepisanie powiodło się.');
        yield put(getGlobalDataRequest());
    } catch (error) {
        yield put(A.swapCoursesFail());
        notitier.alert('Przepisanie nie powiodło się.');
    }
};

export function* withoutColisionWorker(action: AnyAction) {
    try {
        const { data } = yield call(getCoursesWithoutColision, action.courseId);
        const ids: number[] = data.ids;
        const coursesForSubject: CourseWithoutSubject[] = yield select(coursesForSubjectSelector(action.subjectId));
        const courses = coursesForSubject?.filter((c) => ids.some(id => c.id === id)) ?? [];
        yield put(A.coursesWithoutColisionSuccess(courses));
    } catch (error) {
        yield put(A.coursesWithoutColisionFail());
        notitier.alert('Wystąpił błąd. Odśwież i sprobuj raz jeszcze.');
    }
};

export function* coursesSwappingWatcher() {
    yield all([
        takeEvery(C.CoursesSwappingActionType.SwapCoursesRequest, swapCoursesWorker),
        takeEvery(C.CoursesSwappingActionType.CoursesWithoutColisionRequest, withoutColisionWorker),
    ]);
};