package pl.edu.agh.springapp.domain.teacher;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.subject.SubjectAllDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherAllDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherPostDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService service;

    @PostMapping("/teachers")
    public TeacherDto newTeacher(@RequestBody TeacherPostDto teacherPostDto) {
        return service.newTeacher(teacherPostDto);
    }

    @GetMapping("/teachers")
    public ResponseEntity<Page<TeacherAllDto>> getAllTeachers(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        Page<TeacherAllDto> list = service.getAllTeachers(pageNo, pageSize);
        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/teachers/{id}")
    void deleteTeacher(@PathVariable Long id) {
        service.deleteTeacherWithId(id);
    }

}
