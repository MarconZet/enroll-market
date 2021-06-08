import {Course, CourseType, DayOfWeek, Time} from "../../api/models";
import { useSelector } from 'react-redux';
import {allCoursesSelector} from '../../store/globalData/selectors';
import Timetable from "../../components/Timetable/Timetable";

export const GlobalTimetablePage: React.FC = () => {
    let courses = useSelector(allCoursesSelector);

    return (
        <Timetable courses={courses}/>
    )
}

export default GlobalTimetablePage

// const courses = [{
//     subject: {id: 1, name: "Systemy rozproszone"},
//     courseType: CourseType.LABORATORY,
//     dayOfWeek: DayOfWeek.SATURDAY,
//     id:0,
//     startTime: "11:15",
//     teacher: {
//         emailAddress: "",
//         id: 0,
//         name: "Jarosław",
//         surname: "Koźlak"
//     },
//     weekType: "A"
// },
//     {
//         subject: {id: 1, name: "IO"},
//         courseType: CourseType.LECTURE,
//         dayOfWeek: DayOfWeek.TUESDAY,
//         id: 0,
//         startTime: "9:35",
//         teacher: {
//             emailAddress: "",
//             id: 0,
//             name: "Tomasz",
//             surname: "Szydło"
//         },
//         weekType: "B"
//     },
//     {
//         subject: {id: 1, name: "PUM"},
//         courseType: CourseType.LESSON,
//         dayOfWeek: DayOfWeek.TUESDAY,
//         id: 0,
//         startTime: "10:00",
//         teacher: {
//             emailAddress: "",
//             id: 0,
//             name: "Marian",
//             surname: "Edward"
//         },
//         weekType: "B"
//     },
//     {
//         subject: {id: 1, name: "ZAJEBIŚCIE DŁUGA NAZWA"},
//         courseType: CourseType.PROJECT,
//         dayOfWeek: DayOfWeek.TUESDAY,
//         id: 0,
//         startTime: "11:29",
//         teacher: {
//             emailAddress: "",
//             id: 0,
//             name: "Elo",
//             surname: "Elo"
//         },
//         weekType: "AB"
//     },
//     {
//         subject: {id: 1, name: "ZAJEBIŚCIE DŁUGA NAZWA2"},
//         courseType: CourseType.PROJECT,
//         dayOfWeek: DayOfWeek.TUESDAY,
//         id: 0,
//         startTime: "11:15",
//         teacher: {
//             emailAddress: "",
//             id: 0,
//             name: "Marian",
//             surname: "Paździoch"
//         },
//         weekType: "AB"
//     },
//     {
//         subject: {id: 1, name: "ZAJEBIŚCIE DŁUGA NAZWA2"},
//         courseType: CourseType.PROJECT,
//         dayOfWeek: DayOfWeek.TUESDAY,
//         id: 0,
//         startTime: "11:15",
//         teacher: {
//             emailAddress: "",
//             id: 0,
//             name: "Marian",
//             surname: "Paździoch"
//         },
//         weekType: "AB"
//     },
//     {
//         subject: {id: 1, name: "WDIB"},
//         courseType: CourseType.LABORATORY,
//         dayOfWeek: DayOfWeek.WEDNESDAY,
//         id: 0,
//         startTime: "12:50",
//         teacher: {
//             emailAddress: "",
//             id: 0,
//             name: "Marek",
//             surname: "Gajęcki"
//         },
//         weekType: "A"
//     },
//     {
//         subject: {id: 1, name: "AK"},
//         courseType: CourseType.LABORATORY,
//         dayOfWeek: DayOfWeek.WEDNESDAY,
//         id: 0,
//         startTime: "12:50",
//         teacher: {
//             emailAddress: "",
//             id: 0,
//             name: "Łukasz",
//             surname: "Czekierda"
//         },
//         weekType: "AB"
//     },
//     {
//         subject: {id: 1, name: "PP"},
//         courseType: CourseType.LESSON,
//         dayOfWeek: DayOfWeek.WEDNESDAY,
//         id: 0,
//         startTime: "14:20",
//         teacher: {
//             emailAddress: "",
//             id: 0,
//             name: "Bartosz",
//             surname: "Kwolek"
//         },
//         weekType: "AB"
//     }]
