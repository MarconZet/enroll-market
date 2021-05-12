import * as P from './parts';
import {DayOfWeek} from "../../api/models";

export interface TimetableTemplateProps {
    columnWidth: number,
    hourWidth: number,
    dayHeight: number,
    unitHeight: number,
    unitsNo: number
}

export const TimetableTemplate: React.FC<TimetableTemplateProps> = ({columnWidth, hourWidth, dayHeight, unitHeight, unitsNo}) => {
    const days = Object.values(DayOfWeek)
    const hours = Array.from({length: (20 - 8)}, (v, k) => k + 8)

    return (
        <P.Table>
            <tbody>
                <P.Tr>
                    <P.Td_hour/>
                    {days.map((day, idx) => (
                        <P.Th key={idx} style={{minWidth: columnWidth, height: dayHeight}}>{day}</P.Th>
                    ))}
                </P.Tr>
                {hours.map((hour, idx) => (
                    <P.Tr key={idx}>
                        <P.Td_hour style={{minWidth: hourWidth}}>{hour}:00</P.Td_hour>
                        {days.map((_, idx2) => (
                            <P.Td key={idx2}>
                                <P.Table_internal>
                                    <tbody>
                                    {[...Array(unitsNo)].map((_, idx3) => (
                                        <P.Tr_internal key={idx3}><P.Td_internal style={{minWidth: columnWidth, height: unitHeight}}/></P.Tr_internal>
                                    ))}
                                    </tbody>
                                </P.Table_internal>
                            </P.Td>
                        ))}
                    </P.Tr>
                ))}
            </tbody>
        </P.Table>
    )
}

export default TimetableTemplate
