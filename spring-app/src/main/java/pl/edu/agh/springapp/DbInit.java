package pl.edu.agh.springapp;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import pl.edu.agh.springapp.data.dto.course.CoursePostDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferPostDto;
import pl.edu.agh.springapp.data.dto.student.StudentPostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectPostDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherPostDto;
import pl.edu.agh.springapp.data.mapper.*;
import pl.edu.agh.springapp.data.model.*;
import pl.edu.agh.springapp.domain.FileUploadDownloadService;
import pl.edu.agh.springapp.repository.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class DbInit implements CommandLineRunner {
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;
    private final SubjectRepository subjectRepository;
    private final StudentRepository studentRepository;
    private final OfferRepository offerRepository;

    private final TeacherMapper teacherMapper;
    private final CourseMapper courseMapper;
    private final SubjectMapper subjectMapper;
    private final StudentMapper studentMapper;
    private final OneToOneOfferMapper oneToOneOfferMapper;
    private final OfferMapper offerMapper;

    private final FileUploadDownloadService fileUploadDownloadService;

    @Override
    public void run(String... args) {
        // subjects
        List<SubjectPostDto> subjectPostDtos = Arrays.asList(
                new SubjectPostDto("Analiza matematyczna"),
                new SubjectPostDto("Algebra"),
                new SubjectPostDto("Programowanie obiektowe"),
                new SubjectPostDto("Systemy rozproszone"),
                new SubjectPostDto("Programowanie systemowe")
        );
        List<Subject> subjects = subjectMapper.subjectPostDtosToSubjects(subjectPostDtos);
        List<Subject> savedSubjects = new ArrayList<>();
        subjectRepository.saveAll(subjects).forEach(savedSubjects::add);

        // teachers
        List<TeacherPostDto> teacherPostDtos = Arrays.asList(
                new TeacherPostDto("Wacław", "Frydrych", "frydrych@agh.edu.pl"),
                new TeacherPostDto("Adam", "Kowalski", "kowalski@agh.edu.pl"),
                new TeacherPostDto("Jakub", "Przybyło", "przybylo@agh.edu.pl"),
                new TeacherPostDto("Mariusz", "Kostkowski", "kostkowski@agh.edu.pl"),
                new TeacherPostDto("Marian", "Kozik", "kozik@agh.edu.pl"),
                new TeacherPostDto("Aleksander", "Pohl", "pohl@agh.edu.pl"),
                new TeacherPostDto("Krzysztof", "Zieliński", "zielinski@agh.edu.pl"),
                new TeacherPostDto("Łukasz", "Czekierda", "czekierda@agh.edu.pl"),
                new TeacherPostDto("Jarosław", "Kożlak", "kozlak@agh.edu.pl")
        );
        List<Teacher> teachers = teacherMapper.teacherPostDtosToTeachers(teacherPostDtos);
        List<Teacher> savedTeachers = new ArrayList<>();
        teacherRepository.saveAll(teachers).forEach(savedTeachers::add);

        // courses
        List<CoursePostDto> coursePostDtos = Arrays.asList(
                // analiza
                new CoursePostDto(savedSubjects.get(0).getId(), CourseType.LABORATORY.name(),
                        LocalTime.of(12, 50), DayOfWeek.MONDAY.name(), WeekType.A.name(), 15, 1, savedTeachers.get(1).getId()),
                new CoursePostDto(savedSubjects.get(0).getId(), CourseType.LABORATORY.name(),
                        LocalTime.of(12, 50), DayOfWeek.TUESDAY.name(), WeekType.A.name(), 15, 2, savedTeachers.get(1).getId()),
                new CoursePostDto(savedSubjects.get(0).getId(), CourseType.LECTURE.name(),
                        LocalTime.of(8, 0), DayOfWeek.TUESDAY.name(), WeekType.A.name(), 1440, 0, savedTeachers.get(0).getId()),
                // algebra
                new CoursePostDto(savedSubjects.get(1).getId(), CourseType.LECTURE.name(),
                        LocalTime.of(9, 35), DayOfWeek.MONDAY.name(), WeekType.A.name(), 1440, 0,savedTeachers.get(2).getId()),
                new CoursePostDto(savedSubjects.get(1).getId(), CourseType.LESSON.name(),
                        LocalTime.of(12, 50), DayOfWeek.MONDAY.name(), WeekType.A.name(), 30, 1, savedTeachers.get(3).getId()),
                new CoursePostDto(savedSubjects.get(1).getId(), CourseType.LESSON.name(),
                        LocalTime.of(14, 40), DayOfWeek.MONDAY.name(), WeekType.A.name(), 30, 2, savedTeachers.get(3).getId()),
                new CoursePostDto(savedSubjects.get(1).getId(), CourseType.LESSON.name(),
                        LocalTime.of(12, 50), DayOfWeek.MONDAY.name(), WeekType.B.name(), 30, 3, savedTeachers.get(4).getId()),
                // programowanie obiektowe
                new CoursePostDto(savedSubjects.get(2).getId(), CourseType.LABORATORY.name(),
                        LocalTime.of(12, 50), DayOfWeek.WEDNESDAY.name(), WeekType.A.name(), 15, 1, savedTeachers.get(5).getId()),
                new CoursePostDto(savedSubjects.get(2).getId(), CourseType.LABORATORY.name(),
                        LocalTime.of(11, 15), DayOfWeek.WEDNESDAY.name(), WeekType.A.name(), 15, 2, savedTeachers.get(5).getId()),
                // rozproszone
                new CoursePostDto(savedSubjects.get(3).getId(), CourseType.LECTURE.name(),
                        LocalTime.of(12, 50), DayOfWeek.THURSDAY.name(), WeekType.A.name(), 1440, 0, savedTeachers.get(6).getId()),
                new CoursePostDto(savedSubjects.get(3).getId(), CourseType.LABORATORY.name(),
                        LocalTime.of(16, 10), DayOfWeek.THURSDAY.name(), WeekType.B.name(), 15, 1, savedTeachers.get(7).getId()),
                new CoursePostDto(savedSubjects.get(3).getId(), CourseType.LABORATORY.name(),
                        LocalTime.of(17, 45), DayOfWeek.THURSDAY.name(), WeekType.A.name(), 15, 2, savedTeachers.get(7).getId()),
                // programowanie systemowe
                new CoursePostDto(savedSubjects.get(4).getId(), CourseType.LECTURE.name(),
                        LocalTime.of(12, 50), DayOfWeek.FRIDAY.name(), WeekType.A.name(), 1440, 0, savedTeachers.get(8).getId())
        );
        List<Course> courses = courseMapper.coursePostDtosToCourses(coursePostDtos);
        List<Course> savedCourses = new ArrayList<>();
        courseRepository.saveAll(courses).forEach(savedCourses::add);

        List<StudentPostDto> studentPostDtos = Arrays.asList(
                new StudentPostDto("Marta", "Słomka", "123456"),
                new StudentPostDto("Śmieszek", "Melisa", "797955"),
                new StudentPostDto("Kazimierz", "Siodełko", "313414"),
                new StudentPostDto("Brandon", "Kwiatek", "222999"),
                new StudentPostDto("Beniamin", "Wystrzał", "232595")
        );
        List<Student> students = studentMapper.studentPostDtosToStudents(studentPostDtos);
        List<Student> savedStudents = new ArrayList<>();
        Student student = students.get(0);
        student.getCourses().add(savedCourses.get(0));
        studentRepository.saveAll(students).forEach(savedStudents::add);

        List<OneToOneOfferPostDto> oneToOneOfferPostDtos = Arrays.asList(
                new OneToOneOfferPostDto("example comment1", 16L, 15L),
                new OneToOneOfferPostDto("example comment2", 18L, 19L),
                new OneToOneOfferPostDto("example comment3", 17L, 16L)
        );
        List<Offer> offers = oneToOneOfferMapper.oneToOneOfferPostDtosToOffers(oneToOneOfferPostDtos);
        offers.get(0).setStudent(savedStudents.get(1));
        offers.get(1).setStudent(savedStudents.get(1));
        offers.get(2).setStudent(savedStudents.get(0));
        offerRepository.saveAll(offers);

        try {
            File initialFile = new File("enroll_example.csv");
            fileUploadDownloadService.loadFile(new FileInputStream(initialFile));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
