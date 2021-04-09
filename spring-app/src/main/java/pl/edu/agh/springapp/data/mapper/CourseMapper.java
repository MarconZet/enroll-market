package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.course.CourseWithoutSubjectDto;
import pl.edu.agh.springapp.data.model.Course;

@Mapper(
        componentModel = "spring",
        uses = {TeacherMapper.class, SubjectMapper.class}
)
public interface CourseMapper {
    @Mapping(source = "type", target = "courseType")
    @Mapping(source = "day", target = "dayOfWeek")
    @Mapping(target = "startTime", dateFormat = "HH:mm")
    CourseDto subjectGroupToSubjectGroupDto(Course course);

    @Mapping(source = "type", target = "courseType")
    @Mapping(source = "day", target = "dayOfWeek")
    @Mapping(target = "startTime", dateFormat = "HH:mm")
    @Mapping(source = "teacher.id", target = "teacherId")
    CourseWithoutSubjectDto subjectGroupToSubjectGroupWithoutSubjectDto(Course course);

    @Mapping(source = "courseType", target = "type")
    @Mapping(source = "dayOfWeek", target = "day")
    @Mapping(target = "startTime", dateFormat = "HH:mm")
    Course subjectGroupDtoToSubjectGroup(CourseDto courseDto);
}
