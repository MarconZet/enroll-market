package pl.edu.agh.springapp.domein.student;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.student.StudentDto;
import pl.edu.agh.springapp.data.dto.student.StudentPostDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherAllDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherPostDto;
import pl.edu.agh.springapp.data.mapper.StudentMapper;
import pl.edu.agh.springapp.data.mapper.TeacherMapper;
import pl.edu.agh.springapp.data.model.Student;
import pl.edu.agh.springapp.data.model.Teacher;
import pl.edu.agh.springapp.repository.StudentRepository;
import pl.edu.agh.springapp.repository.TeacherRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;

    public StudentDto newStudent(StudentPostDto studentPostDto) {
        Student student = studentMapper.studentPostDtoToStudent(studentPostDto);
        Student savedStudent = studentRepository.save(student);
        StudentDto result = studentMapper.studentToStudentDto(savedStudent);
        return result;
    }

    public List<StudentDto> getAllStudents() {
        List<Student> students = StreamSupport.stream(studentRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return studentMapper.studentToStudentsDtos(students);
    }

    public void deleteStudentWithId(Long id) {
        studentRepository.deleteById(id);
    }
}
