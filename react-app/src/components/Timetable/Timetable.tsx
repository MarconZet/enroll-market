import * as T from "../../utils/timetable";
import * as P from "./parts";
import TimetableTemplate from "../TimetableTemplate/TimetableTemplate";
import {Course} from "../../api/models";

interface TimetableProps{
    courses: Course[]
}

export const Timetable: React.FC<TimetableProps> = ({courses}) => {
    let timetable = new T.Timetable(courses)

    return (
        <>
            <P.Wrapper>
                <div style={{position: "relative"}}>
                    <TimetableTemplate columnWidth={T.dims.columnWidth} hourWidth={T.dims.hourWidth} dayHeight={T.dims.dayHeight} unitHeight={T.dims.unitHeight} unitsNo={T.dims.unitsNo}/>
                    {timetable.days.map((clusters, idx1) => (
                        clusters.map((cluster, idx2) => (
                            cluster.courses.map((course, idx3) => (
                                <P.Course noCourses={cluster.courses.length} key={idx3} style={{
                                    transform: "translate(" + T.translationX(course.dayOfWeek, idx3, cluster.courses.length) + "px, " + T.translationY(T.formatTime(course.startTime)) + "px)",
                                    width: T.dimX(cluster.courses.length),
                                    height: T.dimY(18),
                                    background: T.courseTypeColor(course.courseType)
                                }}>
                                    <P.TimePlaceholder/>
                                    <P.Time>{T.timeRangeString(T.formatTime(course.startTime))} {course.weekType}</P.Time>
                                    <P.Subject>{course.subject.name} - {T.translations[course.courseType]}</P.Subject>
                                    <P.Teacher>{course.teacher.name + " " + course.teacher.surname}</P.Teacher>
                                </P.Course>
                            ))
                        ))
                    ))}
                </div>
            </P.Wrapper>
        </>
    )
}

export default Timetable
