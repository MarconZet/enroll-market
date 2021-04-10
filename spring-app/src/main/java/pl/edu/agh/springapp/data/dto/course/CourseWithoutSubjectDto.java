package pl.edu.agh.springapp.data.dto.course;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseWithoutSubjectDto {
    private Long id;

    @ApiModelProperty(
            value = "Course Type enum, one of: PROJECT, LABORATORY, LESSON, LECTURE" ,
            name = "courseType",
            example= "PROJECT",
            dataType = "String"
    )
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

    private Long teacherId;
}
