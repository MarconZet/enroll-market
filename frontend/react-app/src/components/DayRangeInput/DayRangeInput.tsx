import { useState, useEffect } from 'react';
import { DayOfWeek } from '../../api/models';
import * as P from './parts';

export interface ExtendedTimeBlock {
    dayOfWeek: DayOfWeek;
    wholeDay: boolean;
    startTime: string;
    endTime: string;
    index: number;
}

export interface DayRangeInputProps {
    valueChangeHandler: (dayOfWeek: DayOfWeek, wholeDay: boolean, startTime: string, endTime: string) => void;
    deleteHandler: () => void;
    timeBlock: ExtendedTimeBlock
}

const translations: {[key: string]: string} = {
    'MONDAY': 'Poniedziałek',
    'TUESDAY': 'Wtorek',
    'WEDNESDAY': 'Środa',
    'THURSDAY': 'Czwartek',
    'FRIDAY': 'Piątek',
    'SATURDAY': 'Sobota',
    'SUNDAY': 'Niedziela',
};

const DayRangeInput: React.FC<DayRangeInputProps> = ({ valueChangeHandler, deleteHandler, timeBlock }) => {
    const [day, setDay] = useState(timeBlock.dayOfWeek);
    const [wholeDay, setWholeDay] = useState(timeBlock.wholeDay);
    const [startTime, setStartTime] = useState(timeBlock.startTime);
    const [endTime, setEndTime] = useState(timeBlock.endTime);

    useEffect(() => {
        valueChangeHandler(day, wholeDay, startTime, endTime);

    }, [day, wholeDay, startTime, endTime, valueChangeHandler]);

    return (
        <P.Wrapper>
            <P.Select onChange={(e) => setDay(e.target.value as DayOfWeek)} value={day}>
                {
                    Object.keys(translations).map((key, index) => (
                        <option key={index} value={key}>{translations[key]}</option>
                    ))
                }
            </P.Select>
            <label>
                <input type="checkbox" checked={wholeDay} onChange={(e) => setWholeDay(e.target.checked)} /> Cały dzień? 
            </label>
            <label>
                od: <input type="time" value={startTime} max={endTime} onChange={(e) => setStartTime(e.target.value)} disabled={wholeDay}/>
            </label>
            <label>
                do: <input type="time" value={endTime} min={startTime} onChange={(e) => setEndTime(e.target.value)} disabled={wholeDay} />
            </label>
            <P.RemoveButton type="button" onClick={(e) => { deleteHandler(); e.preventDefault(); }}>
                Usuń
            </P.RemoveButton>
        </P.Wrapper>
    );
};

export default DayRangeInput;