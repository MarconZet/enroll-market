package pl.edu.agh.springapp.data.dto.studentsCourses;

import lombok.Data;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.student.StudentDto;

@Data
public class StudentsCoursesDto {
    private Long id;
    private StudentDto student;
    private CourseDto givenCourse;
}
