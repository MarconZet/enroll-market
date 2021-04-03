import React, { FormEventHandler, useState } from 'react';
import { Filters } from '../../store/offersListing/constants';
import * as P from './parts';

export interface FiltersColumnProps {
    submitCallback: (data: Filters) => void;
    subjectsList?: string[];
    timeSlots?: string[];
}

export const FiltersColumn: React.FC<FiltersColumnProps> = ({ submitCallback, subjectsList, timeSlots }) => {
    const [subject, setSubject] = useState('Wszystkie');
    const [wantedSlot, setWantedSlot] = useState('Wszystkie');
    const [offeredSlot, setOfferedSlot] = useState('Wszystkie');

    const onSubmit: FormEventHandler<Element> = (event) => {
        submitCallback({
            subject,
            wantedSlot,
            offeredSlot,
        });
        event.preventDefault();
    }

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>, setter: (arg: string) => void) => {
        setter(event.target.value);
    }

    return (
        <P.Container onSubmit={onSubmit}>
            <P.Title>Filtruj</P.Title>
            <P.Select name="subject" id="subject" onChange={(e) => onChange(e, setSubject)} value={subject}>
                <option key={-1} value="Wszystkie">Wszystkie przedmioty</option>
                {subjectsList?.map(
                    (subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                    )
                )}
            </P.Select>
            <P.Select name="offeredSlot" id="offeredSlot" onChange={(e) => onChange(e, setOfferedSlot)} value={offeredSlot}>
                <option key={-1} value="Wszystkie">Wszystkie oferowane terminy</option>
                {timeSlots?.map(
                    (slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                    )
                )}
            </P.Select>
            <P.Select name="wantedSlot" id="wantedSlot" onChange={(e) => onChange(e, setWantedSlot)} value={wantedSlot}>
                <option key={-1} value="Wszystkie">Wszystkie oczekiwane terminy</option>
                {timeSlots?.map(
                    (slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                    )
                )}
            </P.Select>
            <P.Submit>Zastosuj</P.Submit>
        </P.Container>
    );
};