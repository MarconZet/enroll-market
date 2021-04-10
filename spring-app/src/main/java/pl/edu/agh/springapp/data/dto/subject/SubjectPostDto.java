package pl.edu.agh.springapp.data.dto.subject;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectPostDto {

    @ApiModelProperty(
            value = "Name of subject" ,
            name = "name",
            example= "Analiza matematyczna",
            dataType = "String"
    )
    private String name;
}
