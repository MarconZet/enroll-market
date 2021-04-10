package pl.edu.agh.springapp.data.dto.course;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import pl.edu.agh.springapp.data.dto.subject.SubjectShortDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;

import java.time.LocalTime;

@Data
public class CourseWithoutTeacherDto {
    private Long id;
    private SubjectShortDto subject;
    private String courseType;

    @ApiModelProperty(
            value = "Start time in format: \"08:00\"" ,
            name = "startTime",
            example= "08:00",
            dataType = "String"
    )
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;

    @ApiModelProperty(
            value = "Day enum, one of: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY" ,
            name = "startTime",
            example= "MONDAY",
            dataType = "String"
    )
    private String dayOfWeek;
}
