import { FormEventHandler, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as P from './parts';
import * as A from '../../store/offersManagement/actions';
import { CourseType } from '../../api/models';
import { coursesForSubjectAndTypeSelector, isLoadingGlobalDataSelector, subjectsNamesAndIdsSelector } from '../../store/globalData/selectors';
import { getGlobalDataRequest } from '../../store/globalData/actions';
import OneForOneForm from '../../components/OneForOneForm/OneForOneForm';

export const AddOfferPage: React.FC = () => {
    const dispatch = useDispatch();
    const [subject, setSubject] = useState(-1);
    const [type, setType] = useState<CourseType | "none">("none");
    const [givenCourseId, setGivenCourseId] = useState(-1);
    const [takenCourseId, setTakenCourseId] = useState(-1);

    let subjects = useSelector(subjectsNamesAndIdsSelector);
    let courses = useSelector(coursesForSubjectAndTypeSelector(subject, type));
    let isLoadingSubjects = useSelector(isLoadingGlobalDataSelector);

    useEffect(() => {
        dispatch(getGlobalDataRequest());
	}, [dispatch]);

    useEffect(() => {
        setGivenCourseId(-1);
        setTakenCourseId(-1);
    }, [subject, type]);

    const onSubmit: FormEventHandler<Element> = (event) => {
        dispatch(A.createOneForOneOfferRequest(givenCourseId, takenCourseId));
        event.preventDefault();
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
                            <OneForOneForm
                                givenCourseId={givenCourseId}
                                takenCourseId={takenCourseId}
                                courses={courses}
                                onChangeGivenCourse={(e) => setGivenCourseId(+e.target.value)}
                                onChangeTakenCourse={(e) => setTakenCourseId(+e.target.value)}
                            />
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