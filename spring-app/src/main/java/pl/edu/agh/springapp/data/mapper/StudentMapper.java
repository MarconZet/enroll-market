package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import pl.edu.agh.springapp.data.dto.student.StudentDto;
import pl.edu.agh.springapp.data.model.Student;

@Mapper
public interface StudentMapper {
    Student studentDtoToStudent(StudentDto studentDto);
    StudentDto studentToStudentDto(Student student);
}
