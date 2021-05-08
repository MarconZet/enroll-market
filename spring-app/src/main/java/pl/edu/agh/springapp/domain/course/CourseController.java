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
import pl.edu.agh.springapp.data.dto.teacher.TeacherAllDto;
import pl.edu.agh.springapp.security.user.CurrentUser;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CourseController {
    private final CourseService service;
    private final CurrentUser currentUser;

    @PostMapping("/courses")
    public ResponseEntity<CourseDto> newTeacher(@RequestBody CoursePostDto coursePostDto) {
        return new ResponseEntity<>(service.newCourse(coursePostDto), new HttpHeaders(), HttpStatus.CREATED);
    }

    @GetMapping("/courses")
    public ResponseEntity<Page<CourseDto>> getAllCourses(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        System.out.println("index: " + currentUser.getIndex() + " username: " + currentUser.getFirstname());
        Page<CourseDto> list = service.getAllCourses(pageNo, pageSize);
        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<CourseDto> getCourse(@PathVariable Long id) {
        return new ResponseEntity<>(service.getCourseWithId(id), new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<Boolean> deleteCourse(@PathVariable Long id) {
        service.deleteCourseWithId(id);
        return ResponseEntity.noContent().build();
    }


}
