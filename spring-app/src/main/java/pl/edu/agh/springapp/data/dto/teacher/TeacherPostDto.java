package pl.edu.agh.springapp.data.dto.teacher;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherPostDto {
    @ApiModelProperty(
            value = "Name of teacher" ,
            name = "name",
            example= "Wacław",
            dataType = "String"
    )
    private String name;

    @ApiModelProperty(
            value = "Surname of teacher" ,
            name = "surname",
            example= "Frydrych",
            dataType = "String"
    )
    private String surname;

    @ApiModelProperty(
            value = "Email of teacher" ,
            name = "emailAddress",
            example= "frydrych@agh.edu.pl",
            dataType = "String"
    )
    private String emailAddress;
}
