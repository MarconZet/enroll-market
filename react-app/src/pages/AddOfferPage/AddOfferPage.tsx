import { FormEventHandler, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as P from './parts';
import * as A from '../../store/offersManagement/actions';
import { CourseType, DayOfWeek } from '../../api/models';
import { myCousesForSubjectAndTypeSelector, coursesForSubjectAndTypeSelector, isLoadingGlobalDataSelector, teachersNamesForSubjectAndTypeSelector, mySubjectsNamesAndIdsSelector } from '../../store/globalData/selectors';
import OneForOneForm from '../../components/OneForOneForm/OneForOneForm';
import ConditionalForm from '../../components/ConditionalForm/ConditionalForm';
import { ExtendedTimeBlock } from '../../components/DayRangeInput/DayRangeInput';

export const AddOfferPage: React.FC = () => {
    const dispatch = useDispatch();
    const [subject, setSubject] = useState(-1);
    const [type, setType] = useState<CourseType | "none">("none");
    const [offerType, setOfferType] = useState("1for1");
    const [latestBlockIndex, setLatestBlockIndex] = useState(0);
    const [comment, setComment] = useState("");

    const [givenCourseId, setGivenCourseId] = useState(-1);
    const [takenCourseId, setTakenCourseId] = useState(-1);

    const [chosenTeachers, setChosenTeachers] = useState<number[]>([]);
    const [chosenTimeBlocks, setChosenTimeBlocks] = useState<ExtendedTimeBlock[]>([]);

    let subjects = useSelector(mySubjectsNamesAndIdsSelector);
    let myCourses = useSelector(myCousesForSubjectAndTypeSelector(subject, type));
    let courses = useSelector(coursesForSubjectAndTypeSelector(subject, type));
    let teachers = useSelector(teachersNamesForSubjectAndTypeSelector(subject, type));
    let isLoadingSubjects = useSelector(isLoadingGlobalDataSelector);

    useEffect(() => {
        setGivenCourseId(-1);
        setTakenCourseId(-1);
        setChosenTeachers([]);
    }, [subject, type]);

    useEffect(() => {
        setChosenTeachers([]);
        setChosenTimeBlocks([]);
        setTakenCourseId(-1);
    }, [offerType]);

    const onSubmit: FormEventHandler<Element> = (event) => {
        if (offerType === '1for1') {
            dispatch(A.createOneForOneOfferRequest(givenCourseId, takenCourseId, comment));
        } else if (offerType === 'cond') {
            const timeBlocks = chosenTimeBlocks.map(block => ({
                dayOfWeek: block.dayOfWeek,
                startTime: block.wholeDay ? null : block.startTime,
                endTime: block.wholeDay ? null : block.endTime,
            }))
            dispatch(A.createOfferRequest(givenCourseId, chosenTeachers, timeBlocks, comment));
        }
        event.preventDefault();
    };

    const onCheckTeacher: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.checked) {
            setChosenTeachers([
                ...chosenTeachers,
                +event.target.value,
            ]);
        } else {
            setChosenTeachers(chosenTeachers.filter(e => e !== +event.target.value));
        }
    };

    const onChangeBlock = (id: number) => (dayOfWeek: DayOfWeek, wholeDay: boolean, startTime: string, endTime: string) => {
        const blocks = chosenTimeBlocks;
        blocks[id] = {
            ...blocks[id],
            dayOfWeek,
            wholeDay,
            startTime,
            endTime,
        };

        setChosenTimeBlocks(blocks);
    };

    const onDeleteBlock = (id: number) => () => {
        setChosenTimeBlocks(
            [
                ...( id > 0 ? chosenTimeBlocks.slice(0, id) : []),
                ...( id < chosenTimeBlocks.length-1 ? chosenTimeBlocks.slice(id+1) : []),
            ]
        );
    }

    const onAddBlock = () => {
        setChosenTimeBlocks([
            ...chosenTimeBlocks,
            {
                dayOfWeek: DayOfWeek.MONDAY,
                wholeDay: true,
                startTime: "00:00",
                endTime: "00:01",
                index: latestBlockIndex + 1,
            }
        ]);
        setLatestBlockIndex(latestBlockIndex+1);
    };

    const formGetter = () => {
        if (offerType === "1for1") {
            return (
                <OneForOneForm
                    givenCourseId={givenCourseId}
                    takenCourseId={takenCourseId}
                    comment={comment}
                    myCourses={myCourses}
                    courses={courses}
                    onChangeGivenCourse={(e) => setGivenCourseId(+e.target.value)}
                    onChangeTakenCourse={(e) => setTakenCourseId(+e.target.value)}
                    onChangeComment={(e) => setComment(e.target.value)}
                />
            );
        } else if (offerType === "cond") {
            return (
                <ConditionalForm
                    teachers={teachers}
                    onCheckTeacher={onCheckTeacher}
                    givenCourseId={givenCourseId}
                    myCourses={myCourses}
                    onChangeGivenCourse={(e) => setGivenCourseId(+e.target.value)}
                    timeBlocks={chosenTimeBlocks}
                    changeBlockHandler={onChangeBlock}
                    deleteBlockHandler={onDeleteBlock}
                    addBlockHandler={onAddBlock}
                    comment={comment}
                    onChangeComment={(e) => setComment(e.target.value)}
                />
            );
        }

        return null;
    };

    const disableForm = () => {
        if ((subject === -1) || (type === "none") || (givenCourseId === -1)) {
            return true;
        }

        if ((offerType === "1for1") && (takenCourseId === -1)) {
            return true;
        }

        if ((offerType === "cond") && (!chosenTimeBlocks.length || !chosenTeachers.length)) {
            return true;
        }

        return false;
    }

    return isLoadingSubjects ? (<></>) : (
        <P.Wrapper>
            <P.Form onSubmit={onSubmit}>
                <P.Title>Dodaj ofertę</P.Title>
                <P.Select name="subject" id="subject" onChange={(e) => setSubject(+e.target.value)} value={subject}>
                    <option key={-1} value={-1}>Wybierz przedmiot</option>
                    {
                        subjects.map((e, index) => (
                            <option key={index} value={e.id}>{e.name}</option>
                        ))
                    }
                </P.Select>
                <P.Select name="type" id="type" onChange={(e) => setType(e.target.value as (CourseType | "none"))} value={type}>
                    <option value={"none"}>Wybierz typ zajęć</option>
                    <option value={CourseType.LESSON}>Ćwiczenia</option>
                    <option value={CourseType.LABORATORY}>Laboratorium</option>
                    <option value={CourseType.PROJECT}>Projekt</option>
                </P.Select>
                <P.Select name="offerType" id="offerType" onChange={(e) => setOfferType(e.target.value)} value={offerType}>
                    <option value={"1for1"}>Typ oferty: 1 na 1</option>
                    <option value={"cond"}>Typ oferty: z warunkami</option>
                </P.Select>
                {courses.length > 0
                    ? (
                        formGetter()
                    ) : (
                        <P.Title>Brak terminów. Ustaw inny przedmiot lub typ zajęć.</P.Title>
                    )
                }
                <P.Submit disabled={disableForm()}>Dodaj</P.Submit>
            </P.Form>
        </P.Wrapper>
    );
};

export default AddOfferPage;