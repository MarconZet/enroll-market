package pl.edu.agh.springapp.domain.student;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.student.StudentDto;
import pl.edu.agh.springapp.data.dto.student.StudentPostDto;
import pl.edu.agh.springapp.data.dto.student.StudentWithCoursesDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectAllDto;
import pl.edu.agh.springapp.data.mapper.CourseMapper;
import pl.edu.agh.springapp.data.mapper.StudentMapper;
import pl.edu.agh.springapp.data.mapper.TeacherMapper;
import pl.edu.agh.springapp.data.model.Student;
import pl.edu.agh.springapp.error.EntityNotFoundException;
import pl.edu.agh.springapp.error.WrongFieldsException;
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
    private final CourseMapper courseMapper;
    private final CurrentUser currentUser;

    public StudentDto newStudent(StudentPostDto studentPostDto) {
        Student student = studentMapper.studentPostDtoToStudent(studentPostDto);
        if (studentRepository.existsByIndexNumber(studentPostDto.getIndexNumber())) {
            throw new WrongFieldsException("Student with such index exist!",
                    "indexNumber", studentPostDto.getIndexNumber());
        }
        Student savedStudent = studentRepository.save(student);
        return studentMapper.studentToStudentDto(savedStudent);
    }

    public Page<StudentDto> getAllStudents(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        return studentRepository.findAll(paging).map(studentMapper::studentToStudentDto);
    }

    public StudentWithCoursesDto getMe(){
        var student = studentRepository.findFirstByIndexNumber(currentUser.getIndex());
        if (student == null) {
            throw new EntityNotFoundException("Logged student doesn't exist in database");
        }
        return studentMapper.studentToStudentWithCoursesDto(student);
    }

    public List<CourseDto> getMyCourses(){
        var student = studentRepository.findFirstByIndexNumber(currentUser.getIndex());
        if (student == null) {
            throw new EntityNotFoundException("Logged student doesn't exist in database");
        }
        return courseMapper.coursesToCoursesDtos(student.getCourses());
    }

    public void deleteStudentWithId(Long id) {
        studentRepository.deleteById(id);
    }
}
