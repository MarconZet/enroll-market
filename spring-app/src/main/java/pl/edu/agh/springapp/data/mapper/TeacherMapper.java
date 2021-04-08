package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import pl.edu.agh.springapp.data.dto.TeacherDto;
import pl.edu.agh.springapp.data.model.Teacher;

@Mapper
public interface TeacherMapper {
    Teacher teacherDtoToTeacher(TeacherDto teacherDto);
}
