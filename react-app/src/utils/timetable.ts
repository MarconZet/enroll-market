import {Course, CourseType, DayOfWeek, Time} from "../api/models";

export class Cluster{
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

export class Timetable{
    days: Array<Array<Cluster>>

    constructor(courses?: Course[]) {
        this.days = [[], [], [], [], [], [], []]
        courses?.forEach(c => this.addCourse(c))
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

export const formatTime = (time: string): Time => {
    const i = time.indexOf(":");
    const hour = parseInt(time.substring(0, i))
    const minute = parseInt(time.substring(i + 1))
    return {hour: hour, minute: minute, second: 0, nano: 0}
}

export const translations = {
    'PROJECT': 'P',
    'LABORATORY': 'L',
    'LECTURE': 'W',
    'LESSON': 'C',
};

export const dims = {
    columnWidth: 210,
    hourWidth: 50,
    dayHeight: 30,
    unitHeight: 8,
    unitsNo: 12
}

export const dimsb = {
    columnWidth: dims.columnWidth + 1,
    hourWidth: dims.hourWidth + 1,
    dayHeight: dims.dayHeight + 1,
    unitHeight: dims.unitHeight + 1,
    unitsNo: dims.unitsNo
}

export const translationX = (dayOfWeek: DayOfWeek, idx:number, coursesNo: number): number => {
    const n = Object.values(DayOfWeek).indexOf(dayOfWeek);
    let position = n * dimsb.columnWidth + dimsb.hourWidth
    position += idx * dimX(coursesNo)
    return position
}

export const translationY = (startTime: Time): number => {
    const n  = startTime.minute / 5 + (startTime.hour - 8) * 12
    return n * dimsb.unitHeight + dimsb.dayHeight
}

export const dimX = (coursesNo: number): number => {
    return dimsb.columnWidth / coursesNo
}

export const dimY = (unitsNo: number): number => {
    return dimsb.unitHeight * unitsNo
}

export const timePad = (n: number): string => {
    return String(n).padStart(2, "0")
}

export const timeRangeString = (startTime: Time): string => {
    let endHour = startTime.hour + 1
    if(startTime.minute >= 30)
        endHour += 1;
    let endMinute = (startTime.minute + 30) % 60
    return timePad(startTime.hour) + ":" + timePad(startTime.minute) + " - " + timePad(endHour) + ":" + timePad(endMinute)
}

export const courseTypeColor = (courseType: CourseType): string => {
    switch (courseType){
        case CourseType.LABORATORY:
            return "#0995ff"
        case CourseType.LECTURE:
            return "#ff6614"
        case CourseType.LESSON:
            return "green"
        case CourseType.PROJECT:
            return "#7614ff"
    }
}
