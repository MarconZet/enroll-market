package pl.edu.agh.springapp;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import pl.edu.agh.springapp.data.dto.course.CoursePostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectPostDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherPostDto;
import pl.edu.agh.springapp.data.mapper.CourseMapper;
import pl.edu.agh.springapp.data.mapper.SubjectMapper;
import pl.edu.agh.springapp.data.mapper.TeacherMapper;
import pl.edu.agh.springapp.data.model.*;
import pl.edu.agh.springapp.repository.CourseRepository;
import pl.edu.agh.springapp.repository.SubjectRepository;
import pl.edu.agh.springapp.repository.TeacherRepository;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class DbInit implements CommandLineRunner {
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;
    private final SubjectRepository subjectRepository;

    private final TeacherMapper teacherMapper;
    private final CourseMapper courseMapper;
    private final SubjectMapper subjectMapper;

    @Override
    public void run(String... args) throws Exception {
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
                        LocalTime.of(12, 50), DayOfWeek.MONDAY.name(), savedTeachers.get(1).getId()),
                new CoursePostDto(savedSubjects.get(0).getId(), CourseType.LABORATORY.name(),
                        LocalTime.of(12, 50), DayOfWeek.TUESDAY.name(), savedTeachers.get(1).getId()),
                new CoursePostDto(savedSubjects.get(0).getId(), CourseType.LECTURE.name(),
                        LocalTime.of(8, 0), DayOfWeek.TUESDAY.name(), savedTeachers.get(0).getId()),
                // algebra
                new CoursePostDto(savedSubjects.get(1).getId(), CourseType.LECTURE.name(),
                        LocalTime.of(9, 35), DayOfWeek.MONDAY.name(), savedTeachers.get(2).getId()),
                new CoursePostDto(savedSubjects.get(1).getId(), CourseType.LESSON.name(),
                        LocalTime.of(12, 50), DayOfWeek.MONDAY.name(), savedTeachers.get(3).getId()),
                new CoursePostDto(savedSubjects.get(1).getId(), CourseType.LESSON.name(),
                        LocalTime.of(14, 40), DayOfWeek.MONDAY.name(), savedTeachers.get(3).getId()),
                new CoursePostDto(savedSubjects.get(1).getId(), CourseType.LESSON.name(),
                        LocalTime.of(12, 50), DayOfWeek.MONDAY.name(), savedTeachers.get(4).getId()),
                // programowanie obiektowe
                new CoursePostDto(savedSubjects.get(2).getId(), CourseType.LABORATORY.name(),
                        LocalTime.of(12, 50), DayOfWeek.WEDNESDAY.name(), savedTeachers.get(5).getId()),
                new CoursePostDto(savedSubjects.get(2).getId(), CourseType.LABORATORY.name(),
                        LocalTime.of(11, 15), DayOfWeek.WEDNESDAY.name(), savedTeachers.get(5).getId()),
                // rozproszone
                new CoursePostDto(savedSubjects.get(3).getId(), CourseType.LECTURE.name(),
                        LocalTime.of(12, 50), DayOfWeek.THURSDAY.name(), savedTeachers.get(6).getId()),
                new CoursePostDto(savedSubjects.get(3).getId(), CourseType.LABORATORY.name(),
                        LocalTime.of(16, 10), DayOfWeek.THURSDAY.name(), savedTeachers.get(7).getId()),
                new CoursePostDto(savedSubjects.get(3).getId(), CourseType.LABORATORY.name(),
                        LocalTime.of(17, 45), DayOfWeek.THURSDAY.name(), savedTeachers.get(7).getId()),
                // programowanie systemowe
                new CoursePostDto(savedSubjects.get(4).getId(), CourseType.LECTURE.name(),
                        LocalTime.of(12, 50), DayOfWeek.FRIDAY.name(), savedTeachers.get(8).getId())
        );
        List<Course> courses = courseMapper.coursePostDtosToCourses(coursePostDtos);
        List<Course> savedCourses = new ArrayList<>();
        courseRepository.saveAll(courses).forEach(savedCourses::add);
    }
}
