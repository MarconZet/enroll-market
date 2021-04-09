package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.course.CoursePostDto;
import pl.edu.agh.springapp.data.dto.course.CourseWithoutSubjectDto;
import pl.edu.agh.springapp.data.dto.course.CourseWithoutTeacherDto;
import pl.edu.agh.springapp.data.model.*;
import pl.edu.agh.springapp.repository.TeacherRepository;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {TeacherMapper.class, SubjectMapper.class}
)
public interface CourseMapper {
    @Mapping(source = "type", target = "courseType")
    @Mapping(source = "day", target = "dayOfWeek")
    @Mapping(target = "startTime", dateFormat = "HH:mm")
    CourseDto courseToCourseDto(Course course);

    @Mapping(source = "type", target = "courseType")
    @Mapping(source = "day", target = "dayOfWeek")
    @Mapping(target = "startTime", dateFormat = "HH:mm")
    @Mapping(source = "teacher.id", target = "teacherId")
    CourseWithoutSubjectDto courseToCourseWithoutSubjectDto(Course course);

    @Mapping(source = "type", target = "courseType")
    @Mapping(source = "day", target = "dayOfWeek")
    @Mapping(target = "startTime", dateFormat = "HH:mm")
    CourseWithoutTeacherDto courseToCourseWithoutTeacherDto(Course course);

    @Mapping(source = "courseType", target = "type")
    @Mapping(source = "dayOfWeek", target = "day")
    @Mapping(target = "startTime", dateFormat = "HH:mm")
    Course courseDtoToCourse(CourseDto courseDto);

    @Mapping(source = "courseType", target = "type")
    @Mapping(source = "dayOfWeek", target = "day")
    @Mapping(target = "startTime", dateFormat = "HH:mm")
    @Mapping(source = "subjectId", target = "subject")
    @Mapping(source = "teacherId", target = "teacher")
    Course coursePostDtoToCourse(CoursePostDto coursePostDto);

    List<Course> coursePostDtosToCourses(List<CoursePostDto> coursePostDtoList);
    List<CourseDto> coursesToCoursesDtos(List<Course> courses);
}
