import { CourseWithoutSubject } from '../../api/models';
import * as P from './parts';

const translations = {
    'MONDAY': 'Poniedziałek',
    'TUESDAY': 'Wtorek',
    'WEDNESDAY': 'Środa',
    'THURSDAY': 'Czwartek',
    'FRIDAY': 'Piątek',
    'SATURDAY': 'Sobota',
    'SUNDAY': 'Niedziela',
};

export interface CourseWithoutSubjectWithTeacher extends CourseWithoutSubject {
    teacher: {
        name?: string;
        surname?: string;
    };
}

export interface OneForOneFormProps {
    courses: CourseWithoutSubjectWithTeacher[];
    onChangeGivenCourse: React.ChangeEventHandler<HTMLSelectElement>;
    onChangeTakenCourse: React.ChangeEventHandler<HTMLSelectElement>;
    givenCourseId: number;
    takenCourseId: number;
}

const OneForOneForm: React.FC<OneForOneFormProps> = ({ courses, onChangeGivenCourse, onChangeTakenCourse, givenCourseId, takenCourseId }) => {
    return (
        <>
            <P.Select name="givenCourseId" id="givenCourseId" onChange={onChangeGivenCourse} value={givenCourseId}>
                <option key={-1} value={-1}>Wybierz zajęcia, które chcesz wymienić</option>
                {
                    courses.map((e, index) => (
                        <option key={index} value={e.id}>{translations[e.dayOfWeek]}, {e?.weekType ? `tydzień ${e.weekType}, `  : ''}{e.startTime}, prowadzący: {e.teacher.name} {e.teacher.surname}</option>
                    ))
                }
            </P.Select>
            <P.Select name="takenCourseId" id="takenCourseId" onChange={onChangeTakenCourse} value={takenCourseId}>
                <option key={-1} value={-1}>Wybierz zajęcia, na które chcesz się wymienić</option>
                {
                    courses.map((e, index) => (
                        <option key={index} value={e.id}>{translations[e.dayOfWeek]}, tydzień {e.weekType}, {e.startTime}, prowadzący: {e.teacher.name} {e.teacher.surname}</option>
                    ))
                }
            </P.Select>
        </>
    );
}

export default OneForOneForm;