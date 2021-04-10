package pl.edu.agh.springapp.data.dto.student;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentPostDto {

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
