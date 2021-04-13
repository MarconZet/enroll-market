package pl.edu.agh.springapp.data.dto.studentsCourses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.student.StudentDto;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentsCoursesPostDto {
    private StudentDto student;
    private CourseDto givenCourse;
}
