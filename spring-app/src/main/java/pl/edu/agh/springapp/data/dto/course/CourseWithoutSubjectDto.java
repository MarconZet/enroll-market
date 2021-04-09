package pl.edu.agh.springapp.data.dto.course;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseWithoutSubjectDto {
    private Long id;
    private String courseType;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    private String dayOfWeek;
    private Long teacherId;
}
