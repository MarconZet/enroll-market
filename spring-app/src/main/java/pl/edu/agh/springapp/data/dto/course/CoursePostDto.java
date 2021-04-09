package pl.edu.agh.springapp.data.dto.course;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.agh.springapp.data.dto.subject.SubjectShortDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoursePostDto {
    private Long subjectId;
    private String courseType;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    private String dayOfWeek;
    private Long teacherId;
}
