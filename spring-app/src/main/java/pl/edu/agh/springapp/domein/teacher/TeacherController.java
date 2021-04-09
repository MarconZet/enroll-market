package pl.edu.agh.springapp.domein.teacher;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
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
    public List<TeacherDto> getAllTeachers() {
        return service.getAllTeachers();
    }

    @DeleteMapping("/teachers/{id}")
    void deleteTeacher(@PathVariable Long id) {
        service.deleteTeacherWithId(id);
    }

}
