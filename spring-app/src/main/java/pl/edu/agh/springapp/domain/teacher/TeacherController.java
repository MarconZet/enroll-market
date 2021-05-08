package pl.edu.agh.springapp.domain.teacher;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.subject.SubjectAllDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectPostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectShortDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherAllDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherPostDto;
import pl.edu.agh.springapp.data.model.Teacher;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService service;

    @PostMapping("/teachers")
    public ResponseEntity<TeacherAllDto> newSubject(@RequestBody TeacherPostDto teacherPostDto) {
        TeacherAllDto teacher = service.newTeacher(teacherPostDto);
        return new ResponseEntity<>(teacher, new HttpHeaders(), HttpStatus.CREATED);
    }

    @GetMapping("/teachers")
    public ResponseEntity<Page<TeacherAllDto>> getAllTeachers(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        Page<TeacherAllDto> list = service.getAllTeachers(pageNo, pageSize);
        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/teachers/{id}")
    public ResponseEntity<TeacherAllDto> getTeacher(@PathVariable Long id) {
        return new ResponseEntity<>(service.getTeacherWithId(id), new HttpHeaders(), HttpStatus.OK);
    }
}
