import * as P from './parts';
import { useSelector } from 'react-redux';
import FileDownload from 'js-file-download';
import {myCoursesSelector, mySubjectsNamesAndIdsSelector, myTeachersSelector} from '../../store/globalData/selectors';
import { getStudentIcsCalendar } from '../../api/requests';
import { userAuthSelector } from '../../store/userAuth/selectors';
import notitier from '../../utils/notifications';
import Timetable from "../../components/Timetable/Timetable";

export const UserTimetablePage: React.FC = () => {
    let courses = useSelector(myCoursesSelector);
    let teachers = useSelector(myTeachersSelector)
    let subjects = useSelector(mySubjectsNamesAndIdsSelector)
    let userData = useSelector(userAuthSelector);

    const onDownloadCalendar = () => {
        if (typeof userData?.id !== 'undefined') {
            getStudentIcsCalendar(userData?.id).then((response) => {
                FileDownload(response.data, 'calendar.ics');
            }).catch((err) => {
                notitier.alert('Pobranie pliku nie powiodło się.');
            });
        }
    };

    return (
        <>
            <P.Download onClick={onDownloadCalendar}>Pobierz plan w fromacie .ics</P.Download>
            <Timetable courses={courses} teachers={teachers} subjects={subjects}/>
        </>
    )
}

export default UserTimetablePage
