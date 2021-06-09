import { useSelector } from 'react-redux';
import {allCoursesSelector, subjectsNamesAndIdsSelector, teachersSelector} from '../../store/globalData/selectors';
import Timetable from "../../components/Timetable/Timetable";

export const GlobalTimetablePage: React.FC = () => {
    let courses = useSelector(allCoursesSelector);
    let teachers = useSelector(teachersSelector)
    let subjects = useSelector(subjectsNamesAndIdsSelector)

    return (
        <Timetable courses={courses} teachers={teachers} subjects={subjects}/>
    )
}

export default GlobalTimetablePage
