package pl.edu.agh.springapp.data.dto.timeBlock;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalTime;

@Data
public class TimeBlockPostDto {
    @ApiModelProperty(
            value = "Start time in format: \"08:00\"" ,
            name = "startTime",
            example= "08:00",
            dataType = "String"
    )
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;

    @ApiModelProperty(
            value = "End time in format: \"08:00\"" ,
            name = "endTime",
            example= "09:30",
            dataType = "String"
    )
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;

    private String dayOfWeek;
}
