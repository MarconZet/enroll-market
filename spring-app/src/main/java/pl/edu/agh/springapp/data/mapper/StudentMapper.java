package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.agh.springapp.data.dto.student.StudentDto;
import pl.edu.agh.springapp.data.dto.student.StudentPostDto;
import pl.edu.agh.springapp.data.dto.student.StudentWithCoursesDto;
import pl.edu.agh.springapp.data.model.Course;
import pl.edu.agh.springapp.data.model.Student;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = CourseMapper.class
)
public interface StudentMapper {
    Student studentDtoToStudent(StudentDto studentDto);
    Student studentPostDtoToStudent(StudentPostDto studentPostDto);
    StudentDto studentToStudentDto(Student student);

    @Mapping(source = "courses", target = "coursesIds")
    StudentWithCoursesDto studentToStudentWithCoursesDto(Student student);
    List<StudentDto> studentToStudentsDtos(List<Student> studentList);
    List<Student> studentPostDtosToStudents(List<StudentPostDto> studentPostDtos);

    default Long map(Course course) {
        return course.getId();
    }
}
