package pl.edu.agh.springapp.domain.student;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.student.StudentDto;
import pl.edu.agh.springapp.data.dto.student.StudentPostDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class StudentController {
    private final StudentService service;

    @PostMapping("/students")
    public StudentDto newStudent(@RequestBody StudentPostDto studentPostDto) {
        return service.newStudent(studentPostDto);
    }

    @GetMapping("/students")
    public List<StudentDto> getAllStudents() {
        return service.getAllStudents();
    }

    @DeleteMapping("/students/{id}")
    void deleteStudent(@PathVariable Long id) {
        service.deleteStudentWithId(id);
    }
}
