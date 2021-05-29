package pl.edu.agh.springapp.domain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.fortuna.ical4j.model.*;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.component.VTimeZone;
import net.fortuna.ical4j.model.property.*;
import net.fortuna.ical4j.util.UidGenerator;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.course.CoursePostDto;
import pl.edu.agh.springapp.data.dto.parsingContainer.ParsingContainerDTO;
import pl.edu.agh.springapp.data.dto.student.StudentPostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectPostDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherPostDto;
import pl.edu.agh.springapp.data.mapper.*;
import pl.edu.agh.springapp.data.model.*;
import pl.edu.agh.springapp.repository.*;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.GregorianCalendar;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileUploadDownloadService {

    private final CSVParser fileParser;
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;
    private final SubjectRepository subjectRepository;
    private final StudentRepository studentRepository;

    private final TeacherMapper teacherMapper;
    private final CourseMapper courseMapper;
    private final SubjectMapper subjectMapper;
    private final StudentMapper studentMapper;

    private String csvHeaders = "subjectName,courseType,maxCount,groupNumber,teacher,teacherMailAddress,isOnline,weekAB,dayOfWeek,startTime,studentName,studentIndex";

    private String getDataFromCourse(Course course) {
        String courseData = "";

        Subject subject = course.getSubject();
        courseData = subject.getName() + "," + course.getType().toString() + ",";
        courseData += course.getMaxStudentCount() + "," + course.getGroupNumber() + ",";
        Teacher teacher = course.getTeacher();
        String teacherData = teacher.getSurname() + " " + teacher.getName() + "," + teacher.getEmailAddress() + ",";
        courseData += teacherData + "Zdalnie,";

        if (course.getWeekType() == WeekType.AB) {
            courseData += ",";
        } else {
            courseData += course.getWeekType().toString() + ",";
        }

        courseData += course.getDay().toString() + ",";
        courseData += course.getStartTime().toString() + ",";

        return courseData;
    }

    public String getFileWithAll() {
        String fileContent = csvHeaders + "\r\n";

        for (Course course: courseRepository.findAll()) {
            String courseData = getDataFromCourse(course);

            if (course.getType() == CourseType.LECTURE){
                fileContent += courseData + ",\r\n";
            } else {
                for (Student student: course.getStudents()) {
                    fileContent += courseData + student.getSurname() + " " + student.getName() + "," + student.getIndexNumber() + "\r\n";
                }
            }
        }
        return fileContent;
    }

    public String getFileForStudent(String indexNumber) {
        String fileContent = "";
        Student student = studentRepository.findFirstByIndexNumber(indexNumber);
        String studentData = student.getSurname() + " " + student.getName() + "," + student.getIndexNumber();
        if (student != null) {
            fileContent += csvHeaders + "\r\n";
            for (Course course : student.getCourses()) {

                fileContent += getDataFromCourse(course);
                fileContent += studentData + "\r\n";
            }
        }

        return fileContent;
    }

    public String getRecurrenceIntervalAndCount(String week) {
        String data;
        if (week.equals("A") || week.equals("B")) {
            data = "INTERVAL=2;COUNT=7";
        } else {
            data = "INTERVAL=1;COUNT=15";
        }
        return data;
    }

    public String getCalendarForStudent(String indexNumber, int semesterStartYear,
                                        int semesterStartMonth, int semesterStartDay) {
        // prepare calendar
        Calendar calendar = new Calendar();
        calendar.getProperties().add(new ProdId("-//Enroll " + indexNumber + "//iCal4j 1.0//PL"));
        calendar.getProperties().add(Version.VERSION_2_0);
        calendar.getProperties().add(CalScale.GREGORIAN);

        TimeZoneRegistry registry = TimeZoneRegistryFactory.getInstance().createRegistry();
        TimeZone timezone = registry.getTimeZone("Europe/Warsaw");
        VTimeZone tz = timezone.getVTimeZone();

        LocalDate now = LocalDate.now().withYear(semesterStartYear).withMonth(semesterStartMonth).withDayOfMonth(semesterStartDay);

        Student student = studentRepository.findFirstByIndexNumber(indexNumber);
        if (student != null) {
            for (Course course : student.getCourses()) {
                DayOfWeek dayOfWeek = course.getDay();
                LocalTime startTime = course.getStartTime();
                LocalDate firstDayInSeries = now;
                if (now.getDayOfWeek() != java.time.DayOfWeek.of(course.getDay().ordinal()+1)) {
                    firstDayInSeries = now.with(TemporalAdjusters.next(java.time.DayOfWeek.of(dayOfWeek.ordinal()+1)));;
                }
                if (course.getWeekType().toString().equals("B")) {
                    firstDayInSeries = firstDayInSeries.plusWeeks(1);
                }

                java.util.Calendar startDate = new GregorianCalendar(firstDayInSeries.getYear(),
                                                firstDayInSeries.getMonthValue()-1,
                                                        firstDayInSeries.getDayOfMonth());
                startDate.setTimeZone(timezone);

                startDate.set(java.util.Calendar.HOUR_OF_DAY, startTime.getHour());
                startDate.set(java.util.Calendar.MINUTE, startTime.getMinute());
                startDate.set(java.util.Calendar.SECOND, startTime.getSecond());

                java.util.Calendar endDate = (java.util.Calendar) startDate.clone();
                endDate.add(java.util.Calendar.HOUR_OF_DAY, 1);
                endDate.add(java.util.Calendar.MINUTE, 30);

                String eventName = course.getSubject().getName() + " - " + course.getType().toString().toLowerCase();
                DateTime start = new DateTime(startDate.getTime());
                DateTime end = new DateTime(endDate.getTime());
                VEvent meeting = new VEvent(start, end, eventName);

                meeting.getProperties().add(tz.getTimeZoneId());

                Uid uid = new Uid(eventName);
                meeting.getProperties().add(uid);

                try {
                    Recur recur = new Recur("FREQ=WEEKLY;BYDAY=" + dayOfWeek.toString().substring(0, 2)
                                                + ";" + getRecurrenceIntervalAndCount(course.getWeekType().toString()));
                    RRule rule = new RRule(recur);
                    meeting.getProperties().add(rule);
                    calendar.getComponents().add(meeting);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }

            return calendar.toString();
        }

        return "";
    }

    public String getFileForTeacher(Long id) {
        String fileContent = "";
        Optional<Teacher> optional = teacherRepository.findById(id);

        if (optional.isPresent()) {
            Teacher teacher = optional.get();
            fileContent += csvHeaders + "\r\n";
            for (Course course: teacher.getCourses()) {
                String courseData = getDataFromCourse(course);

                if (course.getType() == CourseType.LECTURE) {
                    fileContent += courseData + ",\r\n";
                } else {
                    for (Student student: course.getStudents()) {
                        fileContent += courseData;
                        fileContent += student.getSurname() + " " + student.getName() + "," + student.getIndexNumber() + "\r\n";
                    }
                }
            }
        } else {
            log.error("No such teacher in db");
            fileContent = "";
        }

        return fileContent;
    }

    public void loadFile(InputStream file) throws IOException {
        save(parse(file));
    }

    public List<ParsingContainerDTO> parse(InputStream file) throws IOException {
        return fileParser.read(file);
    }

    public void save(List<ParsingContainerDTO> records) {
        // put into database

        List<Subject> subjects = new LinkedList<>();
        List<Teacher> teachers = new LinkedList<>();
        List<Course> courses = new LinkedList<>();
        List<Student> students = new LinkedList<>();

        for (ParsingContainerDTO line : records) {

            String classType = "LECTURE";
            switch (line.getCourseType()) {
                case "P":
                    classType = "PROJECT";
                    break;
                case "L":
                    classType = "LABORATORY";
                    break;
                case "C":
                    classType = "LESSON";
                    break;
            }

            Subject subject;
            List<Subject> subjectList = subjectRepository.findByName(line.getSubjectName());
            if (!subjectList.isEmpty()) {
                subject = subjectList.get(0);
            } else {
                SubjectPostDto subjectPostDto = new SubjectPostDto(line.getSubjectName());
                subject = subjectMapper.subjectPostDtoToSubject(subjectPostDto);
                subjects.add(subject);
                subjectRepository.save(subject);
            }

            String[] teacherData = line.getTeacher().split(" ");
            Teacher teacher;
            List<Teacher> teacherList = teacherRepository.findByNameAndSurnameAndEmailAddress(teacherData[1], teacherData[0], line.getTeacherMailAddress());

            if (!teacherList.isEmpty()) {
                teacher = teacherList.get(0);
            } else {
                TeacherPostDto teacherPostDto = new TeacherPostDto(teacherData[1], teacherData[0], line.getTeacherMailAddress());
                teacher = teacherMapper.teacherPostDtoToTeacher(teacherPostDto);
                teachers.add(teacher);
                teacherRepository.save(teacher);
            }

            String[] startTimeSplitted = line.getStartTime().split(":");
            int hour = Integer.parseInt(startTimeSplitted[0]);
            int min = Integer.parseInt(startTimeSplitted[1]);

            Course course;
            List<Course> courseList;
            if (line.getWeekAB().equals("A") || line.getWeekAB().equals("B")) {
                courseList = courseRepository.findByStartTimeAndTeacherAndDayAndWeekType(LocalTime.of(hour, min), teacher,
                        DayOfWeek.getDayOfWeek(line.getDayOfWeek()), WeekType.valueOf(line.getWeekAB()));
            } else {
                courseList = courseRepository.findByStartTimeAndTeacherAndDayAndWeekType(LocalTime.of(hour, min), teacher,
                        DayOfWeek.getDayOfWeek(line.getDayOfWeek()), WeekType.valueOf("AB"));
            }

            if (!courseList.isEmpty()) {
                course = courseList.get(0);
            } else {
                String weekAB = line.getWeekAB();

                if (!weekAB.equals("A") && !weekAB.equals("B")) {
                    weekAB = "AB";
                }

                CoursePostDto coursePostDto = new CoursePostDto(subject.getId(), classType, LocalTime.of(hour, min),
                        DayOfWeek.convertDayOfWeekName(line.getDayOfWeek()), weekAB, line.getMaxCount(), line.getGroupNumber(), teacher.getId());
                course = courseMapper.coursePostDtoToCourse(coursePostDto);
                courses.add(course);
                courseRepository.save(course);
            }

            if (!classType.equals("LECTURE")) {
                String[] studentData = line.getStudentName().split(" ");
                Student student = studentRepository.findFirstByIndexNumber(line.getStudentIndex());

                if (student == null) {
                    StudentPostDto studentPostDto = new StudentPostDto(studentData[1], studentData[0], line.getStudentIndex());
                    student = studentMapper.studentPostDtoToStudent(studentPostDto);
                    studentRepository.save(student);
                }

                List<Course> student_courses = student.getCourses();
                student_courses.add(course);

                // add student to lecture of that subject
                List<Course> courseLectureList = courseRepository.findBySubjectAndType(subject, CourseType.valueOf("LECTURE"));

                if (!courseLectureList.isEmpty()) {
                    Course lecture = courseLectureList.get(0);
                    List<Course> student_courses2 = student.getCourses();
                    student_courses2.add(lecture);
                }
            }
        }

    }
}
