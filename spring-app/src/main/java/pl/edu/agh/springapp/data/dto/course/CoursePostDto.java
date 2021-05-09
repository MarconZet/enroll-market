package pl.edu.agh.springapp.data.dto.course;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;
import io.swagger.annotations.ApiModelProperty;
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
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    @JsonSerialize(using = LocalTimeSerializer.class)
    private LocalTime startTime;

    @ApiModelProperty(
            value = "Day enum, one of: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY" ,
            name = "startTime",
            example= "MONDAY",
            dataType = "String"
    )
    private String dayOfWeek;

    @ApiModelProperty(
            value = "Course Type enum, one of: A, B" ,
            name = "weekType",
            example= "A",
            dataType = "String"
    )
    private String weekType;

    private Long teacherId;
}
