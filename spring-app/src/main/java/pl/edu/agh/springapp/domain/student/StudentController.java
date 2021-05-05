package pl.edu.agh.springapp.domain.student;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.student.StudentDto;
import pl.edu.agh.springapp.data.dto.student.StudentPostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectAllDto;
import pl.edu.agh.springapp.security.user.CurrentUser;

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
    public ResponseEntity<Page<StudentDto>> getAllSubjects(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        Page<StudentDto> list = service.getAllStudents(pageNo, pageSize);
        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/students/me")
    public StudentDto getMe(){
        return service.getMe();
    }

    @DeleteMapping("/students/{id}")
    void deleteStudent(@PathVariable Long id) {
        service.deleteStudentWithId(id);
    }
}
