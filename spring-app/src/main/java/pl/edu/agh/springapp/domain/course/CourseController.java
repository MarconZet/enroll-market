package pl.edu.agh.springapp.domain.course;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.course.CoursePostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectAllDto;

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
    public ResponseEntity<Page<CourseDto>> getAllCourses(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        Page<CourseDto> list = service.getAllCourses(pageNo, pageSize);
        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/courses/{id}")
    void deleteCourse(@PathVariable Long id) {
        service.deleteCourseWithId(id);
    }

}
