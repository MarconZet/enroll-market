import MultiCheckbox from "../MultiCheckbox/MultiCheckbox";
import { CourseWithoutSubjectWithTeacher } from "../OneForOneForm/OneForOneForm";
import * as P from './parts';

export interface ConditionalFormProps {
    days: { [key: string]: string };
    teachers: { [key: string]: string };
    onCheckDay: React.ChangeEventHandler<HTMLInputElement>;
    onCheckTeacher: React.ChangeEventHandler<HTMLInputElement>;
    myCourses: CourseWithoutSubjectWithTeacher[];
    onChangeGivenCourse: React.ChangeEventHandler<HTMLSelectElement>;
    givenCourseId: number;
}

const translations = {
    'MONDAY': 'Poniedziałek',
    'TUESDAY': 'Wtorek',
    'WEDNESDAY': 'Środa',
    'THURSDAY': 'Czwartek',
    'FRIDAY': 'Piątek',
    'SATURDAY': 'Sobota',
    'SUNDAY': 'Niedziela',
};

const ConditionalForm: React.FC<ConditionalFormProps> = ({ days, teachers, onCheckDay, onCheckTeacher, myCourses, onChangeGivenCourse, givenCourseId }) => (
    <>
        <P.Select name="givenCourseId" id="givenCourseId" onChange={onChangeGivenCourse} value={givenCourseId}>
            <option key={-1} value={-1}>Wybierz zajęcia, które chcesz wymienić</option>
            {
                myCourses.map((e, index) => (
                    <option key={index} value={e.id}>{translations[e.dayOfWeek]}, {e?.weekType ? `tydzień ${e.weekType}, `  : ''}{e.startTime}, prowadzący: {e.teacher.name} {e.teacher.surname}</option>
                ))
            }
        </P.Select>
        <MultiCheckbox
            name="teachers"
            label="Wybierz nauczycieli:"
            choices={teachers}
            onElementChange={onCheckTeacher}
        />
        <MultiCheckbox
            name="days"
            label="Wybierz terminy:"
            choices={days}
            onElementChange={onCheckDay}
        />
    </>
);

export default ConditionalForm;
