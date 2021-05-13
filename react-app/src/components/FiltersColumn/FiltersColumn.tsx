import React, { FormEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CourseType } from '../../api/models';
import { subjectsNamesAndIdsSelector, teachersNamesForSubjectAndTypeSelector } from '../../store/globalData/selectors';
import MultiCheckbox from '../MultiCheckbox/MultiCheckbox';
import * as P from './parts';

export interface FiltersColumnProps {
    submitCallback: (data: string) => void;
}

export const FiltersColumn: React.FC<FiltersColumnProps> = ({ submitCallback }) => {
    const [subject, setSubject] = useState(-1);
    const [type, setType] = useState<CourseType | "none">("none");
    const [chosenTeachers, setChosenTeachers] = useState<number[]>([]);
    const [chosenDays, setChosenDays] = useState<string[]>([]);

    let subjects = useSelector(subjectsNamesAndIdsSelector);
    let teachers = useSelector(teachersNamesForSubjectAndTypeSelector(subject, type));

    useEffect(() => {
        setChosenTeachers([]);
    }, [subject, type]);

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
        let search = '';

        if (subject !== -1) {
            search += `subject:${subject}`
        }

        if (type !== 'none') {
            if (!!search.length) {
                search += ',';
            }

            search += `type:${type}`
        }

        if (!!chosenDays.length) {
            for (let i = 0; i < chosenDays.length; i++) {
                if (!!search.length) {
                    search += ',';
                }

                search += `day:${chosenDays[i]}`;
            }
        }

        if (!!chosenTeachers.length) {
            for (let i = 0; i < chosenTeachers.length; i++) {
                if (!!search.length) {
                    search += ',';
                }

                search += `teacher:${chosenTeachers[i]}`;
            }
        }

        submitCallback(search);
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

    return (
        <P.Container onSubmit={onSubmit}>
            <P.Title>Filtruj</P.Title>
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
            <MultiCheckbox
                name="days"
                label="Wybierz terminy:"
                choices={days}
                onElementChange={onCheckDay}
            />
            {
                Object.keys(teachers).length > 0 && (
                    <MultiCheckbox
                        name="teachers"
                        label="Wybierz nauczycieli:"
                        choices={teachers}
                        onElementChange={onCheckTeacher}
                    />
                )
            }
            <P.Submit>Zastosuj</P.Submit>
        </P.Container>
    );
};