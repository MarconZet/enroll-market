import { FormEventHandler, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as P from './parts';
import * as A from '../../store/offersManagement/actions';
import { CourseType, DayOfWeek } from '../../api/models';
import { myCousesForSubjectAndTypeSelector, coursesForSubjectAndTypeSelector, isLoadingGlobalDataSelector, subjectsNamesAndIdsSelector, teachersNamesForSubjectAndTypeSelector } from '../../store/globalData/selectors';
import OneForOneForm from '../../components/OneForOneForm/OneForOneForm';
import ConditionalForm from '../../components/ConditionalForm/ConditionalForm';

export const AddOfferPage: React.FC = () => {
    const dispatch = useDispatch();
    const [subject, setSubject] = useState(-1);
    const [type, setType] = useState<CourseType | "none">("none");
    const [offerType, setOfferType] = useState("1for1");

    const [givenCourseId, setGivenCourseId] = useState(-1);
    const [takenCourseId, setTakenCourseId] = useState(-1);

    const [chosenTeachers, setChosenTeachers] = useState<number[]>([]);
    const [chosenDays, setChosenDays] = useState<string[]>([]);

    let subjects = useSelector(subjectsNamesAndIdsSelector);
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
        setChosenDays([]);
        setTakenCourseId(-1);
    }, [offerType]);

    const days = {
        'MONDAY': 'Poniedziałek',
        'TUESDAY': 'Wtorek',
        'WEDNESDAY': 'Środa',
        'THURSDAY': 'Czwartek',
        'FRIDAY': 'Piątek',
        'SATURDAY': 'Sobota',
        'SUNDAY': 'Niedziela',
    };

    const onSubmit: FormEventHandler<Element> = (event) => {
        if (offerType === '1for1') {
            dispatch(A.createOneForOneOfferRequest(givenCourseId, takenCourseId));
        } else if (offerType === 'cond') {
            const timeBlocks = chosenDays.map(day => ({
                dayOfWeek: (day as DayOfWeek),
                startTime: null,
                endTime: null,
            }))
            dispatch(A.createOfferRequest(givenCourseId, chosenTeachers, timeBlocks));
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

    const onCheckDay: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.checked) {
            setChosenDays([
                ...chosenDays,
                event.target.value,
            ]);
        } else {
            setChosenDays(chosenDays.filter(e => e !== event.target.value));
        }
    };

    const formGetter = () => {
        if (offerType === "1for1") {
            return (
                <OneForOneForm
                    givenCourseId={givenCourseId}
                    takenCourseId={takenCourseId}
                    myCourses={myCourses}
                    courses={courses}
                    onChangeGivenCourse={(e) => setGivenCourseId(+e.target.value)}
                    onChangeTakenCourse={(e) => setTakenCourseId(+e.target.value)}
                />
            );
        } else if (offerType === "cond") {
            return (
                <ConditionalForm
                    days={days}
                    teachers={teachers}
                    onCheckDay={onCheckDay}
                    onCheckTeacher={onCheckTeacher}
                    givenCourseId={givenCourseId}
                    myCourses={myCourses}
                    onChangeGivenCourse={(e) => setGivenCourseId(+e.target.value)}
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