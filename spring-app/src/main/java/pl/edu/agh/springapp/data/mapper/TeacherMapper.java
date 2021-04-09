package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import pl.edu.agh.springapp.data.dto.teacher.TeacherAllDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherPostDto;
import pl.edu.agh.springapp.data.model.Teacher;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {TeacherMapperResolver.class, CourseMapper.class}
)
public interface TeacherMapper {
    Teacher teacherDtoToTeacher(TeacherDto teacherDto);
    Teacher teacherPostDtoToTeacher(TeacherPostDto teacherPostDto);
    TeacherDto teacherToTeacherDto(Teacher teacher);
    List<TeacherDto> teachersToTeacherDtos(List<Teacher> teachers);
    List<TeacherAllDto> teachersToTeacherAllDtos(List<Teacher> teachers);
    List<Teacher> teacherPostDtosToTeachers(List<TeacherPostDto> teacher);
    Teacher map(Long id);
}
