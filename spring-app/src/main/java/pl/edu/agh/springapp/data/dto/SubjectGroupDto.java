package pl.edu.agh.springapp.data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalTime;

@Data
public class SubjectGroupDto {
    private Long id;
    private String name;
    private String subjectType;
    private LocalTime startTime;
    private String dayOfWeek;
    private TeacherDto teacher;
}
