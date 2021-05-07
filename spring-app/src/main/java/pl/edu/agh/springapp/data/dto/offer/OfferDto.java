package pl.edu.agh.springapp.data.dto.offer;
import lombok.Data;
import pl.edu.agh.springapp.data.dto.student.StudentDto;
import pl.edu.agh.springapp.data.dto.course.CourseDto;

@Data
public class OfferDto {
    private Long id;
    private StudentDto student;
    private CourseDto givenCourse;
    private OfferConditionsDto offerConditions;
}
