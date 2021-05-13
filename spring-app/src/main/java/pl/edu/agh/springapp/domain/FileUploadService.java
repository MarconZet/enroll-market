package pl.edu.agh.springapp.domain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    private final TeacherMapper teacherMapper;
    private final CourseMapper courseMapper;
    private final SubjectMapper subjectMapper;
    private final StudentMapper studentMapper;

    public String getFile() {
        String fileContent = "";

        for (Course course: courseRepository.findAll()) {
            Subject subject = course.getSubject();
            String courseData = subject.getName() + "," + course.getType().toString() + ",";
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
