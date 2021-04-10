package pl.edu.agh.springapp.data.dto.offer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.agh.springapp.data.dto.student.StudentDto;
import pl.edu.agh.springapp.data.dto.course.CourseDto;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OneToOneOfferPostDto {
    private Long studentId;
    private Long givenCourseId;
    private Long takenCourseId;
}
