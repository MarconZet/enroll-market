package pl.edu.agh.springapp.data.mapper;

import lombok.RequiredArgsConstructor;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;
import org.springframework.stereotype.Component;
import pl.edu.agh.springapp.data.model.Course;
import pl.edu.agh.springapp.error.WrongFieldsException;
import pl.edu.agh.springapp.repository.CourseRepository;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CourseMapperResolver {
    private final CourseRepository courseRepository;

    @ObjectFactory
    public Course resolve(Long id, @TargetType Class<Course> type) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            return course.get();
        } else {
            throw new WrongFieldsException("No course with id: " + id);
        }
    }
}


