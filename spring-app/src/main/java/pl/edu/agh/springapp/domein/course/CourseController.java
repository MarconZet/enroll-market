package pl.edu.agh.springapp.domein.course;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.course.CoursePostDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherAllDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherPostDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CourseController {
    private final CourseService service;

    @PostMapping("/courses")
    public CourseDto newTeacher(@RequestBody CoursePostDto coursePostDto) {
        return service.newTeacher(coursePostDto);
    }

    @GetMapping("/courses")
    public List<CourseDto> getAllTeachers() {
        return service.getAllCourses();
    }

    @DeleteMapping("/courses/{id}")
    void deleteCourse(@PathVariable Long id) {
        service.deleteCourseWithId(id);
    }

}
