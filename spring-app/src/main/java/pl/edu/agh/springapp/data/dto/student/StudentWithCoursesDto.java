package pl.edu.agh.springapp.data.dto.student;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class StudentWithCoursesDto {
    private Long id;

    @ApiModelProperty(
            value = "Name of student" ,
            name = "name",
            example= "Grzegorz",
            dataType = "String"
    )
    private String name;

    @ApiModelProperty(
            value = "Surname of student" ,
            name = "surname",
            example= "Janosz",
            dataType = "String"
    )
    private String surname;

    private String indexNumber;
    List<Long> coursesIds;
}
