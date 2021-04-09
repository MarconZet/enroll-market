package pl.edu.agh.springapp.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectGroupWithoutSubjectDto {
    private Long id;
    private String name;
    private String subjectType;
    private LocalTime startTime;
    private String dayOfWeek;
    private Long teacherId;
}
