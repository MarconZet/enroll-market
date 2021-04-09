package pl.edu.agh.springapp.data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

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
