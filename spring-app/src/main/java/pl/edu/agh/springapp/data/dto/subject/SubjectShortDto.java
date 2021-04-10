package pl.edu.agh.springapp.data.dto.subject;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalTime;

@Data
public class SubjectShortDto {
    private Long id;

    @ApiModelProperty(
            value = "Name of subject" ,
            name = "name",
            example= "Analiza matematyczna",
            dataType = "String"
    )
    private String name;
}
