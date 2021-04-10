package pl.edu.agh.springapp.data.dto.subject;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.agh.springapp.data.dto.course.CourseWithoutSubjectDto;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectAllDto {
    private Long id;

    @ApiModelProperty(
            value = "Name of subject" ,
            name = "name",
            example= "Analiza matematyczna",
            dataType = "String"
    )
    private String name;
    List<CourseWithoutSubjectDto> courses;
}
