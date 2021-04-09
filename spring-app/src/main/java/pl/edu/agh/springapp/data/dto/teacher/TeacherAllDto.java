package pl.edu.agh.springapp.data.dto.teacher;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.agh.springapp.data.dto.course.CourseWithoutTeacherDto;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherAllDto {
    private Long id;

    private String name;
    private String surname;
    private String emailAddress;
    private List<CourseWithoutTeacherDto> courses;
}
