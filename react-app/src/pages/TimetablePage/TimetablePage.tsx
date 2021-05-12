import * as P from './parts';
import {Course, CourseType, DayOfWeek, Time} from "../../api/models";
import TimetableTemplate from "../../components/TimetableTemplate/TimetableTemplate";

export const TimetablePage: React.FC = () => {
    const courses = [{
        subject: {id: 1, name: "Systemy rozproszone"},
        courseType: CourseType.LABORATORY,
        dayOfWeek: DayOfWeek.SATURDAY,
        id: 1,
        startTime: {
            hour: 9,
            minute: 35,
            second: 0,
            nano: 0
        },
        teacher: {
            emailAddress: "mail@address.com",
            id: 1,
            name: "Jarosław",
            surname: "Koźlak"
        }
    },
        {
            subject: {id: 1, name: "Systemy rozproszone2"},
            courseType: CourseType.LABORATORY,
            dayOfWeek: DayOfWeek.TUESDAY,
            id: 1,
            startTime: {
                hour: 11,
                minute: 15,
                second: 0,
                nano: 0
            },
            teacher: {
                emailAddress: "mail@address.com",
                id: 1,
                name: "Maciej",
                surname: "Koźlak"
            }
        }]

    const dims = {
        columnWidth: 200,
        hourWidth: 100,
        dayHeight: 30,
        unitHeight: 15,
        unitsNo: 12
    }

    const dimsb = {
        columnWidth: dims.columnWidth + 1,
        hourWidth: dims.hourWidth + 1,
        dayHeight: dims.dayHeight + 1,
        unitHeight: dims.unitHeight + 1,
        unitsNo: dims.unitsNo
    }

    const translationX = (dayOfWeek: DayOfWeek): number => {
        const n = Object.values(DayOfWeek).indexOf(dayOfWeek);
        return n * dimsb.columnWidth + dimsb.hourWidth
    }

    const translationY = (startTime: Time): number => {
        const n  = startTime.minute / 5 + (startTime.hour - 8) * 12
        return n * dimsb.unitHeight + dimsb.dayHeight
    }

    return (
        <div style={{position: "relative"}}>
            <TimetableTemplate columnWidth={dims.columnWidth} hourWidth={dims.hourWidth} dayHeight={dims.dayHeight} unitHeight={dims.unitHeight} unitsNo={dims.unitsNo}/>
            {courses.map(course => (
                <P.Course style={{
                    transform: "translate(" + translationX(course.dayOfWeek) + "px, " + translationY(course.startTime) + "px)",
                    width: dimsb.columnWidth,
                    height: dimsb.unitHeight * 18
                }}>
                    <p>08:00 - 09:30</p>
                    <p>{course.subject.name}</p>
                    <p>{course.teacher.name + " " + course.teacher.surname}</p>
                    <p>{course.courseType}</p>
                </P.Course>
            ))}
        </div>
    )
}

export default TimetablePage
