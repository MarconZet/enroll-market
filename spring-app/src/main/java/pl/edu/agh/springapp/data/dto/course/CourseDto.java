package pl.edu.agh.springapp.data.dto.course;

import lombok.Data;
import pl.edu.agh.springapp.data.dto.subject.SubjectShortDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;

import java.time.LocalTime;

@Data
public class CourseDto {
    private Long id;
    private String name;
    private SubjectShortDto subject;
    private String courseType;
    private LocalTime startTime;
    private String dayOfWeek;
    private TeacherDto teacher;
}
