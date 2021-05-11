import { FormEventHandler, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as P from './parts';
import * as A from '../../store/offersManagement/actions';
import { CourseType } from '../../api/models';
import { coursesForSubjectAndTypeSelector, isLoadingGlobalDataSelector, subjectsNamesAndIdsSelector } from '../../store/globalData/selectors';
import { getGlobalDataRequest } from '../../store/globalData/actions';
import { useKeycloak } from '@react-keycloak/web';

export const AddOfferPage: React.FC = () => {
    const dispatch = useDispatch();
    const [subject, setSubject] = useState(-1);
    const [type, setType] = useState<CourseType | "none">("none");
    const [givenCourseId, setGivenCourseId] = useState(-1);
    const [takenCourseId, setTakenCourseId] = useState(-1);

    let subjects = useSelector(subjectsNamesAndIdsSelector);
    let courses = useSelector(coursesForSubjectAndTypeSelector(subject, type));
    let isLoadingSubjects = useSelector(isLoadingGlobalDataSelector);

    const { keycloak } = useKeycloak();

    useEffect(() => {
		if (keycloak.authenticated) {
			dispatch(getGlobalDataRequest());
		}
	}, [dispatch, keycloak.authenticated]);

    useEffect(() => {
        setGivenCourseId(-1);
        setTakenCourseId(-1);
    }, [subject, type]);

    const onSubmit: FormEventHandler<Element> = (event) => {
        dispatch(A.createOfferRequest(givenCourseId, takenCourseId));
        event.preventDefault();
    };

    const translations = {
        'MONDAY': 'Poniedziałek',
        'TUESDAY': 'Wtorek',
        'WEDNESDAY': 'Środa',
        'THURSDAY': 'Czwartek',
        'FRIDAY': 'Piątek',
        'SATURDAY': 'Sobota',
        'SUNDAY': 'Niedziela',
    };

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
                {courses.length > 0
                    ? (
                        <>
                            <P.Select name="givenCourseId" id="givenCourseId" onChange={(e) => setGivenCourseId(+e.target.value)} value={givenCourseId}>
                                <option key={-1} value={-1}>Wybierz zajęcia, które chcesz wymienić</option>
                                {
                                    courses.map((e, index) => (
                                        <option key={index} value={e.id}>{translations[e.dayOfWeek]}, {e.startTime.hour}:{e.startTime.minute}, prowadzący: {e.teacher.name} {e.teacher.surname}</option>
                                    ))
                                }
                            </P.Select>
                            <P.Select name="takenCourseId" id="takenCourseId" onChange={(e) => setTakenCourseId(+e.target.value)} value={takenCourseId}>
                                <option key={-1} value={-1}>Wybierz zajęcia, na które chcesz się wymienić</option>
                                {
                                    courses.map((e, index) => (
                                        <option key={index} value={e.id}>{translations[e.dayOfWeek]}, {e.startTime.hour}:{e.startTime.minute}, prowadzący: {e.teacher.name} {e.teacher.surname}</option>
                                    ))
                                }
                            </P.Select>
                        </>
                    ) : (
                        <P.Title>Brak terminów. Ustaw inny przedmiot lub typ zajęć.</P.Title>
                    )
                }
                <P.Submit disabled={(subject === -1) || (type === "none") || (givenCourseId === -1) || (takenCourseId === -1)}>Dodaj</P.Submit>
            </P.Form>
        </P.Wrapper>
    );
};

export default AddOfferPage;