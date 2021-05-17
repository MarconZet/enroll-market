import { DayOfWeek } from "../../api/models";
import DayRangeInput, { ExtendedTimeBlock } from "../DayRangeInput/DayRangeInput";
import MultiCheckbox from "../MultiCheckbox/MultiCheckbox";
import { CourseWithoutSubjectWithTeacher } from "../OneForOneForm/OneForOneForm";
import * as P from './parts';

export interface ConditionalFormProps {
    teachers: { [key: string]: string };
    onCheckTeacher: React.ChangeEventHandler<HTMLInputElement>;
    myCourses: CourseWithoutSubjectWithTeacher[];
    onChangeGivenCourse: React.ChangeEventHandler<HTMLSelectElement>;
    givenCourseId: number;
    timeBlocks: ExtendedTimeBlock[];
    changeBlockHandler: (index: number) => (dayOfWeek: DayOfWeek, wholeDay: boolean, startTime: string, endTime: string) => void;
    deleteBlockHandler: (index: number) => () => void;
    addBlockHandler: () => void;
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

const ConditionalForm: React.FC<ConditionalFormProps> = ({ teachers, onCheckTeacher, myCourses, onChangeGivenCourse, givenCourseId, timeBlocks, changeBlockHandler, deleteBlockHandler, addBlockHandler }) => {
    return (
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
            <span>Wybierz terminy:</span>
            {
                timeBlocks.map((block, index) => (
                    <DayRangeInput
                        key={block.index}
                        timeBlock={block}
                        valueChangeHandler={changeBlockHandler(index)}
                        deleteHandler={deleteBlockHandler(index)}
                    />
                ))
            }
            <button onClick={(e) => { addBlockHandler(); e.preventDefault(); }}>Nowy termin</button>
        </>
    );
}

export default ConditionalForm;
