import * as P from './parts';
import { ReactComponent as Arrow } from '../../assets/arrow-point-to-right.svg';
import { ExtendedOffer } from '../../store/offersListing/constants';

export interface ConditionalTileProps {
    offer: ExtendedOffer;
    acceptCallback?: (offerId: number, courseId: number) => () => void;
    editCallback?: () => void;
    deleteCallback?: () => void;
    reverseOrder?: boolean;
}

const translations = {
    'MONDAY': 'Poniedziałek',
    'TUESDAY': 'Wtorek',
    'WEDNESDAY': 'Środa',
    'THURSDAY': 'Czwartek',
    'FRIDAY': 'Piątek',
    'SATURDAY': 'Sobota',
    'SUNDAY': 'Niedziela',
    'PROJECT': 'projekt',
    'LABORATORY': 'laboratorium',
    'LECTURE': 'wykład',
    'LESSON': 'ćwiczenia',
};

export const ConditionalTile: React.FC<ConditionalTileProps> = ({ offer, acceptCallback, editCallback, deleteCallback, reverseOrder }) => (
    <P.Container>
        <P.SubjectName>{offer.givenCourse.subject.name} - {translations[offer.givenCourse.courseType]}</P.SubjectName>
        <P.OffersBox reverseOrder={reverseOrder}>
            <P.SlotBox>
                <P.Subheader isOffered>Oferowany termin</P.Subheader>
                <P.ClassBox isOffered>
                    <b>{offer.givenCourse.teacher.name} {offer.givenCourse.teacher.surname}</b>
                    <b>{translations[offer.givenCourse.dayOfWeek]}, tydzień {offer.givenCourse.weekType}, {offer.givenCourse.startTime}</b>
                    {/* <span>{offeredGroup.comment}</span> */}
                    <span>{offer.student.name} {offer.student.surname}</span>
                </P.ClassBox>
            </P.SlotBox>
            <P.SVGBox>
                <Arrow
                    height="60px"
                    width="60px"
                    // viewBox="0 -5 25 25"
                />
            </P.SVGBox>
            <P.SlotBox>
                <P.Subheader>Warunki</P.Subheader>
                <P.ClassBox fullHeight>
                    {
                        !!offer.offerConditions.teachers.length && (
                            <>
                                <b>Prowadzący - jeden z:</b>
                                <ul>
                                    {
                                        offer.offerConditions.teachers.map((teacher, index) => (
                                            <li key={index}>{teacher.name} {teacher.surname}</li>
                                        ))
                                    }
                                </ul>
                            </>
                        )
                    }
                    {
                        !!offer.offerConditions.timeBlocks.length && (
                            <>
                                <b>Terminy - w zakresach:</b>
                                <ul>
                                    {
                                        offer.offerConditions.timeBlocks.map((block, index) => (
                                            <li key={index}>{translations[block.dayOfWeek]}, {block.startTime} - {block.endTime}</li>
                                        ))
                                    }
                                </ul>
                            </>
                        )
                    }
                </P.ClassBox>
            </P.SlotBox>
        </P.OffersBox>
        {
            !!offer.matchingCourses?.length ? (
                <P.MatchingCoursesBox>
                    <P.Subheader>Pasujące terminy spośród twoich zajęć:</P.Subheader>
                    {
                        offer.matchingCourses.map((course) => (
                            <P.CourseBox>
                                <b>{course.teacher.name} {course.teacher.surname}, {translations[course.dayOfWeek]}, {course?.weekType ? `tydzień ${course.weekType}, `  : ''}{course.startTime}</b>
                                {acceptCallback && <P.Button onClick={acceptCallback(offer.id, course.id)}>Akceptuj</P.Button>}
                            </P.CourseBox>
                        ))
                    }
                </P.MatchingCoursesBox>
            ) : <P.Subheader>Nie możesz zaakceptować tej oferty</P.Subheader>
        }
        <P.ButtonsBox>
            {editCallback && <P.Button onClick={editCallback}>Edytuj</P.Button>}
            {deleteCallback && <P.Button onClick={deleteCallback}>Usuń</P.Button>}
        </P.ButtonsBox>
    </P.Container>
);

export default ConditionalTile;
