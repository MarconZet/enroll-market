package pl.edu.agh.springapp.domain.student;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.student.StudentDto;
import pl.edu.agh.springapp.data.dto.student.StudentPostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectAllDto;
import pl.edu.agh.springapp.data.mapper.StudentMapper;
import pl.edu.agh.springapp.data.model.Student;
import pl.edu.agh.springapp.repository.StudentRepository;
import pl.edu.agh.springapp.security.user.CurrentUser;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;
    private final CurrentUser currentUser;

    public StudentDto newStudent(StudentPostDto studentPostDto) {
        Student student = studentMapper.studentPostDtoToStudent(studentPostDto);
        Student savedStudent = studentRepository.save(student);
        return studentMapper.studentToStudentDto(savedStudent);
    }

    public Page<StudentDto> getAllStudents(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        return studentRepository.findAll(paging).map(studentMapper::studentToStudentDto);
    }

    public StudentDto getMe(){
        var student = studentRepository.findFirstByIndexNumber(currentUser.getIndex());
        return studentMapper.studentToStudentDto(student);
    }

    public void deleteStudentWithId(Long id) {
        studentRepository.deleteById(id);
    }
}
