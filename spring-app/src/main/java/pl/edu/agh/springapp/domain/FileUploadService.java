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

            SubjectPostDto subjectPostDto = new SubjectPostDto(line.getSubjectName());
            Subject subject = subjectMapper.subjectPostDtoToSubject(subjectPostDto);
            subjects.add(subject);
            subjectRepository.save(subject);

            String[] teacherData = line.getTeacher().split(" ");
            TeacherPostDto teacherPostDto = new TeacherPostDto(teacherData[0], teacherData[1], line.getTeacherMailAddress());
            Teacher teacher = teacherMapper.teacherPostDtoToTeacher(teacherPostDto);
            teachers.add(teacher);
            teacherRepository.save(teacher);

            String[] studentData = line.getStudent().split(" ");
            StudentPostDto studentPostDto = new StudentPostDto(studentData[0], studentData[1], false);
            Student student = studentMapper.studentPostDtoToStudent(studentPostDto);
            students.add(student);
            studentRepository.save(student);

            String[] startTimeSplitted = line.getStartTime().split(":");
            int hour = Integer.parseInt(startTimeSplitted[0]);
            int min = Integer.parseInt(startTimeSplitted[1]);

            CoursePostDto coursePostDto = new CoursePostDto(subject.getId(), line.getCourseType(), LocalTime.of(hour, min),
                                                            line.getDayOfWeek(), teacher.getId());
            Course course = courseMapper.coursePostDtoToCourse(coursePostDto);
            courses.add(course);
            courseRepository.save(course);

            StudentsCoursesPostDto studentsCoursesPostDto = new StudentsCoursesPostDto(studentMapper.studentToStudentDto(student),
                    courseMapper.courseToCourseDto(course));
            StudentsCourses studentsCourses = studentsCoursesMapper.subjectPostDtoToSubject(studentsCoursesPostDto);
            studentsCoursess.add(studentsCourses);
            studentsCoursesRepository.save(studentsCoursesMapper.subjectPostDtoToSubject(studentsCoursesPostDto));

        }

    }
}
