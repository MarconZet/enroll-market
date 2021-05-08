package pl.edu.agh.springapp.domain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.course.CoursePostDto;
import pl.edu.agh.springapp.data.dto.parsingContainer.ParsingContainerDTO;
import pl.edu.agh.springapp.data.dto.student.StudentPostDto;
import pl.edu.agh.springapp.data.dto.studentsCourses.StudentsCoursesPostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectPostDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherPostDto;
import pl.edu.agh.springapp.data.mapper.*;
import pl.edu.agh.springapp.data.model.*;
import pl.edu.agh.springapp.repository.*;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalTime;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileUploadService {

    private final CSVParser fileParser;
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;
    private final SubjectRepository subjectRepository;
    private final StudentRepository studentRepository;
    private final StudentsCoursesRepository studentsCoursesRepository;

    private final TeacherMapper teacherMapper;
    private final CourseMapper courseMapper;
    private final SubjectMapper subjectMapper;
    private final StudentMapper studentMapper;
    private final StudentsCoursesMapper studentsCoursesMapper;

    public String getFile() {
        String fileContent = "";


        for (Course course: courseRepository.findAll()) {
            if (course != null) {
                fileContent += course.getSubject().getName() + ", ";
            }
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
        List<StudentsCourses> studentsCoursess = new LinkedList<>();

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
                courseList = courseRepository.findByStartTimeAndTeacherAndDayAndWeek(LocalTime.of(hour, min), teacher,
                        DayOfWeek.getDayOfWeek(line.getDayOfWeek()), line.getWeekAB());
            } else {
                courseList = courseRepository.findByStartTimeAndTeacherAndDay(LocalTime.of(hour, min), teacher,
                        DayOfWeek.getDayOfWeek(line.getDayOfWeek()));
            }

            if (!courseList.isEmpty()) {
                course = courseList.get(0);
            } else {
                String weekAB = line.getWeekAB();

                if (!weekAB.equals("A") && !weekAB.equals("B")) {
                    weekAB = null;
                }

                CoursePostDto coursePostDto = new CoursePostDto(subject.getId(), classType, LocalTime.of(hour, min),
                        DayOfWeek.convertDayOfWeekName(line.getDayOfWeek()), weekAB, teacher.getId());
                course = courseMapper.coursePostDtoToCourse(coursePostDto);
                courses.add(course);
                courseRepository.save(course);
            }

            if (!classType.equals("LECTURE")) {
                String[] studentData = line.getStudentName().split(" ");
                Student student;
                List<Student> studentList = studentRepository.findByNameAndSurname(studentData[1], studentData[0]);

                if (!studentList.isEmpty()) {
                    student = studentList.get(0);
                } else {
                    StudentPostDto studentPostDto = new StudentPostDto(studentData[1], studentData[0], false);
                    student = studentMapper.studentPostDtoToStudent(studentPostDto);
                    students.add(student);
                    studentRepository.save(student);
                }

                StudentsCoursesPostDto studentsCoursesPostDto = new StudentsCoursesPostDto(studentMapper.studentToStudentDto(student),
                        courseMapper.courseToCourseDto(course));
                StudentsCourses studentsCourses = studentsCoursesMapper.subjectPostDtoToSubject(studentsCoursesPostDto);
                studentsCoursess.add(studentsCourses);
                studentsCoursesRepository.save(studentsCoursesMapper.subjectPostDtoToSubject(studentsCoursesPostDto));

                // add student to lecture of that subject
                List<Course> courseLectureList = courseRepository.findBySubjectAndType(subject, CourseType.getCourseTypeFromString(classType));

                if (!courseLectureList.isEmpty()) {
                    Course lecture = courseLectureList.get(0);
                    StudentsCoursesPostDto studentLecturePostDto = new StudentsCoursesPostDto(studentMapper.studentToStudentDto(student),
                            courseMapper.courseToCourseDto(lecture));
                    StudentsCourses studentLecture = studentsCoursesMapper.subjectPostDtoToSubject(studentLecturePostDto);
                    studentsCoursess.add(studentLecture);
                    studentsCoursesRepository.save(studentsCoursesMapper.subjectPostDtoToSubject(studentLecturePostDto));
                }
            }
        }

    }
}
