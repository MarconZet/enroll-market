package pl.edu.agh.springapp.data.dto.student;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class StudentDto {
    private Long id;

    @ApiModelProperty(
            value = "Name of student" ,
            name = "name",
            example= "Grzegorz",
            dataType = "String"
    )
    private String name;

    @ApiModelProperty(
            value = "Surame of student" ,
            name = "surname",
            example= "Janosz",
            dataType = "String"
    )
    private String surname;

    private boolean isAdmin;
}
