package pl.edu.agh.springapp.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseWithoutSubjectDto {
    private Long id;
    private String name;
    private String courseType;
    private LocalTime startTime;
    private String dayOfWeek;
    private Long teacherId;
}
