import { DayOfWeek } from "../../api/models";
import DayRangeInput, { ExtendedTimeBlock } from "../DayRangeInput/DayRangeInput";
import { CourseWithoutSubjectWithTeacher } from "../OneForOneForm/OneForOneForm";
import * as P from './parts';

export interface ConditionalFormProps {
    teachers: { [key: string]: string };
    chosenTeachers: number[];
    onCheckTeacher: React.ChangeEventHandler<HTMLInputElement>;
    myCourses: CourseWithoutSubjectWithTeacher[];
    onChangeGivenCourse: React.ChangeEventHandler<HTMLSelectElement>;
    givenCourseId: number;
    timeBlocks: ExtendedTimeBlock[];
    changeBlockHandler: (index: number) => (dayOfWeek: DayOfWeek, wholeDay: boolean, startTime: string, endTime: string) => void;
    deleteBlockHandler: (index: number) => () => void;
    addBlockHandler: () => void;
    comment: string;
    onChangeComment: React.ChangeEventHandler<HTMLInputElement>;
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

const ConditionalForm: React.FC<ConditionalFormProps> = ({ teachers, chosenTeachers, onCheckTeacher, myCourses, onChangeGivenCourse, givenCourseId, timeBlocks, changeBlockHandler, deleteBlockHandler, addBlockHandler, comment, onChangeComment }) => {
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
            <P.RangesHeader>Wybierz nauczycieli:</P.RangesHeader>
            {
                Object.keys(teachers).map((val, index) => (
                    <label>
                        <input key={`teachers ${index}`} type="checkbox" name="teachers" value={val} onChange={onCheckTeacher} checked={chosenTeachers.some(id => id === +val)} /> {teachers[val]}
                    </label>
                ))
            }
            <P.RangesHeader>Wybierz terminy:</P.RangesHeader>
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
            <P.AddBlockButton onClick={(e) => { addBlockHandler(); e.preventDefault(); }}>Nowy termin</P.AddBlockButton>
            <P.Input name="comment" id="comment" onChange={onChangeComment} value={comment} placeholder="Komentarz osoby wystawiającej"/>
        </>
    );
}

export default ConditionalForm;
