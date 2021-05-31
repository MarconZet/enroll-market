import { FormEventHandler, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as P from './parts';
import * as A from '../../store/coursesSwapping/actions';
import { CourseType } from '../../api/models';
import { myCousesForSubjectAndTypeSelector, isLoadingGlobalDataSelector, mySubjectsNamesAndIdsSelector } from '../../store/globalData/selectors';
import { coursesWithoutColisionSelector, isLoadingCoursesWithoutColisionSelector } from '../../store/coursesSwapping/selectors';

const translations = {
    'MONDAY': 'Poniedziałek',
    'TUESDAY': 'Wtorek',
    'WEDNESDAY': 'Środa',
    'THURSDAY': 'Czwartek',
    'FRIDAY': 'Piątek',
    'SATURDAY': 'Sobota',
    'SUNDAY': 'Niedziela',
};

export const SwapCoursesPage: React.FC = () => {
    const dispatch = useDispatch();
    const [subject, setSubject] = useState(-1);
    const [type, setType] = useState<CourseType | "none">("none");
    const [from, setFrom] = useState(-1);
    const [to, setTo] = useState(-1);

    let subjects = useSelector(mySubjectsNamesAndIdsSelector);
    let myCourses = useSelector(myCousesForSubjectAndTypeSelector(subject, type));
    let courses = useSelector(coursesWithoutColisionSelector);
    let isLoadingSubjects = useSelector(isLoadingGlobalDataSelector);
    let isLoadingCoursesWithoutColision = useSelector(isLoadingCoursesWithoutColisionSelector);

    useEffect(() => {
        setFrom(-1);
        setTo(-1);
    }, [subject, type]);

    useEffect(() => {
        if (from !== -1) {
            dispatch(A.coursesWithoutColisionRequest(from));
        }
    }, [from]);

    const onSubmit: FormEventHandler<Element> = (event) => {
        dispatch(A.swapCoursesRequest(from, to));
        event.preventDefault();
    };

    const disableForm = () => {
        return (from === -1) || (to === -1) || (subject === -1) || (type === "none");
    }

    return isLoadingSubjects ? (<></>) : (
        <P.Wrapper>
            <P.Form onSubmit={onSubmit}>
                <P.Title>Bezkolizyjne przepisanie</P.Title>
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
                {(myCourses.length > 0 && !isLoadingCoursesWithoutColision)
                    ? (
                        <>
                            <P.Select name="from" id="from" onChange={(e) => setFrom(+e.target.value)} value={from}>
                                <option key={-1} value={-1}>Wybierz zajęcia, które chcesz wymienić</option>
                                {
                                    myCourses.map((e, index) => (
                                        <option key={index} value={e.id}>{translations[e.dayOfWeek]}, {e?.weekType ? `tydzień ${e.weekType}, `  : ''}{e.startTime}, prowadzący: {e.teacher.name} {e.teacher.surname}</option>
                                    ))
                                }
                            </P.Select>
                            {courses.length > 0
                                ? (
                                    <P.Select name="to" id="to" onChange={(e) => setTo(+e.target.value)} value={to}>
                                        <option key={-1} value={-1}>Wybierz zajęcia, na które chcesz się wymienić</option>
                                        {
                                            courses.map((e, index) => (
                                                <option key={index} value={e.id}>{translations[e.dayOfWeek]}, tydzień {e.weekType}, {e.startTime}, prowadzący: {e.teacher.name} {e.teacher.surname}</option>
                                            ))
                                        }
                                    </P.Select>
                                ) : (
                                    !isLoadingCoursesWithoutColision && (<P.Title>Brak terminów z możliwością przepisania się. Ustaw inny przedmiot lub typ zajęć.</P.Title>)
                                )
                            }
                        </>
                    ) : (
                        <P.Title>Ustaw odpowiedni przedmiot i typ zajęć.</P.Title>
                    )
                }
                <P.Submit disabled={disableForm()}>Dodaj</P.Submit>
            </P.Form>
        </P.Wrapper>
    );
};

export default SwapCoursesPage;