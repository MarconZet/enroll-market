package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import pl.edu.agh.springapp.data.dto.student.StudentDto;
import pl.edu.agh.springapp.data.dto.student.StudentPostDto;
import pl.edu.agh.springapp.data.model.Student;

import java.util.List;

@Mapper(
        componentModel = "spring"
)
public interface StudentMapper {
    Student studentDtoToStudent(StudentDto studentDto);
    Student studentPostDtoToStudent(StudentPostDto studentPostDto);
    StudentDto studentToStudentDto(Student student);
    List<StudentDto> studentToStudentsDtos(List<Student> studentList);
    List<Student> studentPostDtosToStudents(List<StudentPostDto> studentPostDtos);
}
