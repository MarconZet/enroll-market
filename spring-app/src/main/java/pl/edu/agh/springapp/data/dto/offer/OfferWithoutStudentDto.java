package pl.edu.agh.springapp.data.dto.offer;

import lombok.Data;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.student.StudentDto;

@Data
public class OfferWithoutStudentDto {
    private Long id;
    private CourseDto givenCourse;
    private Boolean isOneToOne;
    private String comment;
    private OfferConditionsDto offerConditions;
}
