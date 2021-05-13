import * as P from './parts';
import {Course, CourseType, DayOfWeek, Time} from "../../api/models";
import TimetableTemplate from "../../components/TimetableTemplate/TimetableTemplate";

export const TimetablePage: React.FC = () => {
    const translations = {
        'PROJECT': 'Projekt',
        'LABORATORY': 'Laboratorium',
        'LECTURE': 'Wykład',
        'LESSON': 'Ćwiczenia',
    };

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

    const translationX = (dayOfWeek: DayOfWeek, idx:number, coursesNo: number): number => {
        const n = Object.values(DayOfWeek).indexOf(dayOfWeek);
        let position = n * dimsb.columnWidth + dimsb.hourWidth
        position += idx * dimX(coursesNo)
        return position
    }

    const translationY = (startTime: Time): number => {
        const n  = startTime.minute / 5 + (startTime.hour - 8) * 12
        return n * dimsb.unitHeight + dimsb.dayHeight
    }

    const dimX = (coursesNo: number): number => {
        return dimsb.columnWidth / coursesNo
    }

    const dimY = (unitsNo: number): number => {
        return dimsb.unitHeight * unitsNo
    }

    const timePad = (n: number): string => {
        return String(n).padStart(2, "0")
    }

    const timeRangeString = (startTime: Time): string => {
        let endHour = startTime.hour + 1
        if(startTime.minute >= 30)
            endHour += 1;
        let endMinute = (startTime.minute + 30) % 60
        return timePad(startTime.hour) + ":" + timePad(startTime.minute) + " - " + timePad(endHour) + ":" + timePad(endMinute)
    }

    let timetable = new Timetable()
    // TODO
    // Here provide with courses
    courses.forEach(c => timetable.addCourse(c))

    return (
        <div style={{position: "relative"}}>
            <TimetableTemplate columnWidth={dims.columnWidth} hourWidth={dims.hourWidth} dayHeight={dims.dayHeight} unitHeight={dims.unitHeight} unitsNo={dims.unitsNo}/>
            {timetable.days.map((clusters, idx1) => (
                clusters.map((cluster, idx2) => (
                    cluster.courses.map((course, idx3) => (
                        <P.Course key={idx3} style={{
                            transform: "translate(" + translationX(course.dayOfWeek, idx3, cluster.courses.length) + "px, " + translationY(formatTime(course.startTime)) + "px)",
                            width: dimX(cluster.courses.length),
                            height: dimY(18)
                        }}>
                            <p>{timeRangeString(formatTime(course.startTime))} {course.weekType}</p>
                            <p>{course.subject.name}</p>
                            <p>{course.teacher.name + " " + course.teacher.surname}</p>
                            <p>{translations[course.courseType]}</p>
                        </P.Course>
                    ))
                ))
            ))}
        </div>
    )
}

export default TimetablePage

class Cluster{
    firstTime: number;
    lastTime: number;
    courses: Array<Course>;

    constructor() {
        this.firstTime = 0
        this.lastTime = 0
        this.courses = []
    }

    addCourse(course: Course){
        const courseTime = getTime(formatTime(course.startTime))
        for(var i = 0; i < this.courses.length; i++){
            if(courseTime <= getTime(formatTime(this.courses[i].startTime)))
                break;
        }
        if(i === 0)
            this.firstTime = courseTime
        if(i === this.courses.length)
            this.lastTime = courseTime
        this.courses.splice(i, 0, course)
    }

    concatCourses(cluster: Cluster){
        this.courses = this.courses.concat(cluster.courses)
        this.lastTime = cluster.lastTime
    }
}

class Timetable{
    days: Array<Array<Cluster>>

    constructor() {
        this.days = [[], [], [], [], [], [], []]
    }

    addCourse(course: Course){
        const clusters = this.days[Object.keys(DayOfWeek).indexOf(course.dayOfWeek)]
        if(clusters === undefined)
            return
        const courseTime = getTime(formatTime(course.startTime))
        for(var i = 0; i < clusters.length; i++){
            if(courseTime <= clusters[i].firstTime)
                break;
        }
        let type = 0
        if(i > 0 && courseTime < clusters[i - 1].lastTime + 90)
            type += 1
        if(i < clusters.length && courseTime + 90 > clusters[i].firstTime)
            type += 2

        if(type === 1)
            clusters[i - 1].addCourse(course)
        else if(type === 2)
            clusters[i].addCourse(course)
        else if(type === 3){
            clusters[i - 1].addCourse(course)
            clusters[i - 1].concatCourses(clusters[i])
            clusters.splice(i, 1)
        }
        else{
            let newCluster = new Cluster()
            newCluster.addCourse(course)
            clusters.splice(i, 0, newCluster)
        }
    }
}

const getTime = (time: Time): number => {
    return time.minute + time.hour * 60;
}

const formatTime = (time: string): Time => {
    const i = time.indexOf(":");
    const hour = parseInt(time.substring(0, i))
    const minute = parseInt(time.substring(i + 1))
    return {hour: hour, minute: minute, second: 0, nano: 0}
}

const courses = [{
    subject: {id: 1, name: "Systemy rozproszone"},
    courseType: CourseType.LABORATORY,
    dayOfWeek: DayOfWeek.SATURDAY,
    id:0,
    startTime: "11:15",
    teacher: {
        emailAddress: "",
        id: 0,
        name: "Jarosław",
        surname: "Koźlak"
    },
    weekType: "A"
},
    {
        subject: {id: 1, name: "IO"},
        courseType: CourseType.LECTURE,
        dayOfWeek: DayOfWeek.TUESDAY,
        id: 0,
        startTime: "9:35",
        teacher: {
            emailAddress: "",
            id: 0,
            name: "Tomasz",
            surname: "Szydło"
        },
        weekType: "B"
    },
    {
        subject: {id: 1, name: "PUM"},
        courseType: CourseType.LESSON,
        dayOfWeek: DayOfWeek.TUESDAY,
        id: 0,
        startTime: "10:00",
        teacher: {
            emailAddress: "",
            id: 0,
            name: "Marian",
            surname: "Edward"
        },
        weekType: "B"
    },
    {
        subject: {id: 1, name: "OI"},
        courseType: CourseType.LESSON,
        dayOfWeek: DayOfWeek.TUESDAY,
        id: 0,
        startTime: "11:29",
        teacher: {
            emailAddress: "",
            id: 0,
            name: "Elo",
            surname: "Elo"
        },
        weekType: "B"
    }]