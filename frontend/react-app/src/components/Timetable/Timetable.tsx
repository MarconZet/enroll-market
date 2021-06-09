import * as T from "../../utils/timetable";
import * as P from "./parts";
import TimetableTemplate from "../TimetableTemplate/TimetableTemplate";
import {Course, CourseType, SubjectShort, Teacher} from "../../api/models";
import React, {FormEventHandler, useState} from "react";

interface TimetableProps{
    courses: Course[];
    teachers: Teacher[];
    subjects: SubjectShort[];
}

export const Timetable: React.FC<TimetableProps> = ({courses, teachers, subjects}) => {
    teachers = [...teachers].sort((t1, t2) => {
        if(t1.surname > t2.surname || (t1.surname === t2.surname && t1.name > t2.name))
            return 1
        return -1
    })

    subjects = subjects.sort((s1, s2) => {
        if(s1.name > s2.name)
            return 1
        return -1
    })

    const [timetable, setTimetable] = useState<T.Timetable>(new T.Timetable(courses))
    const [selectedTeacher, setSelectedTeacher] = useState(-1)
    const [selectedSubject, setSelectedSubject] = useState(-1)
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [displayFilters, setDisplayFilters] = useState(false)

    const onSelectType: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.checked) {
            setSelectedTypes([
                ...selectedTypes,
                event.target.value,
            ]);
        } else {
            setSelectedTypes(selectedTypes.filter(e => e !== event.target.value));
        }
    }

    const onSelectTeacher: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedTeacher(+event.target.value)
    }

    const onSelectSubject: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedSubject(+event.target.value)
    }

    const onSubmit: FormEventHandler<Element> = (event) => {
        event.preventDefault()
        setTimetable(new T.Timetable(courses.filter(
            c =>
                (selectedSubject === -1 ? true : c.subject.id === selectedSubject) &&
                (selectedTeacher === -1 ? true : c.teacher.id === selectedTeacher) &&
                (selectedTypes.length === 0 ? true : selectedTypes.includes(c.courseType))
        )))
    }

    const onClear = () => {
        setSelectedTeacher(-1)
        setSelectedSubject(-1)
        setSelectedTypes([])
    }

    return (
        <>
            <div style={{display: "grid"}}>
                <P.FiltersButton onClick={() => setDisplayFilters(!displayFilters)}>
                    Filtruj
                </P.FiltersButton>
            <P.FiltersWrapper>
                <P.FiltersForm onSubmit={onSubmit} style={displayFilters ? {display: "flex"} : {display: "none"}}>
                    <P.TypesPrompt>Typ zajęć:</P.TypesPrompt>
                    {Object.keys(CourseType).map((val, idx) => (
                        <P.TypeLabel key={`CourseType ${idx}`}>
                            <input type="checkbox" value={val} onChange={onSelectType} checked={selectedTypes.some(t => t === val)}/>{Ttypes[val]}
                        </P.TypeLabel>
                    ))}
                    <P.SelectTeacher onChange={onSelectTeacher} value={selectedTeacher}>
                        <option key={-1} value={-1}>Wybierz prowadzącego</option>
                        {teachers.map((val, idx) => (
                            <option key={idx} value={val.id}>{val.name} {val.surname}</option>
                        ))}
                    </P.SelectTeacher>
                    <P.SelectSubject onChange={onSelectSubject} value={selectedSubject}>
                        <option key={-1} value={-1}>Wybierz przedmiot</option>
                        {subjects.map((val, idx) => (
                            <option key={idx} value={val.id}>{val.name}</option>
                        ))}
                    </P.SelectSubject>
                    <P.ApplyFilters type="submit" value="Zastosuj"/>
                    <P.ClearFilters onClick={onClear}>Wyczyść filtry</P.ClearFilters>
                </P.FiltersForm>
            </P.FiltersWrapper>
            </div>
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

const Ttypes: {[key: string] : string} = {
    'LECTURE': 'Wykład',
    'PROJECT': 'Projekt',
    'LESSON': 'Ćwiczenia',
    'LABORATORY': 'Laboratoria',
};
