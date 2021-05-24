package pl.edu.agh.springapp.data.dto.offer;

import lombok.Data;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.student.StudentDto;

@Data
public class OfferPostDto {
    private Long givenCourseId;
    private String comment;
    private OfferConditionsPostDto offerConditions;
}
